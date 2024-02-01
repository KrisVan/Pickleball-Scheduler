import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAxiosFunction from '../../hooks/useAxiosFunction';

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = crypto.randomUUID();
    setRows((oldRows) => [...oldRows, { id: id, username: '', displayName: '', role: 'BASIC', sessions: [] }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function UsersDataGrid() {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const axiosPrivate = useAxiosPrivate();
	const [UsersResponse, UsersError, UsersLoading, UsersAxiosFetch] = useAxiosFunction();
  const [UsersDelResponse, UsersDelError, UsersDelLoading, UsersDelAxiosFetch] = useAxiosFunction();
  const effectRan = useRef(false);
  const location = useLocation();

  const getUsers = () => {
		UsersAxiosFetch({
			axiosInstance: axiosPrivate,
			method: 'GET',
			url: 'api/users',
		});
		console.log(UsersResponse)
	}

	// Get users on mount
	useEffect (() => {
		if (effectRan.current === false) {
			getUsers();
		}
		return () => {
			effectRan.current = true;
		}
		// eslint-disable-next-line
	},[]);

	// Set users after mount
	useEffect (() => {
		if (UsersResponse?.length > 0) {
			setRows(UsersResponse);
		}
    console.log(UsersResponse);
	},[UsersResponse]);

  // Table Behavior
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    const row = rows.find((row) => row.id === id)
    setRows(rows.filter((row) => row.id !== id));
    UsersDelAxiosFetch({
			axiosInstance: axiosPrivate,
			method: 'DELETE',
			url: `api/users/${row.username}`,
		});
    console.log(UsersDelResponse);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 30, align: 'left',
      headerAlign: 'left'},
    { field: 'username', headerName: 'Username', width: 180, align: 'left',
      headerAlign: 'left', editable: true},
    { field: 'displayName', headerName: 'DisplayName', width: 180,
      align: 'left', headerAlign: 'left', editable: true },
    { field: 'role', headerName: 'Role', width: 180, align: 'left',
      headerAlign: 'left', editable: true, type:'singleSelect',
      valueOptions:['BASIC','ADMIN']
    },
    { field: 'sessions', headerName: 'Sessions', width: 180, align: 'left',
      headerAlign: 'left',},
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        density='compact'
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
      {UsersLoading && <b>Loading...</b>}
      {!UsersLoading && UsersError && <b><Navigate to="/login" replace state={{ from: location }} /></b>}
    </Box>
  );
}