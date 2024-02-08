import * as React from 'react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
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
import SimpleBackdrop from '../SimpleBackDrop/SimpleBackdrop';

function EditToolbar(props) {
  const { setRows, setRowModesModel, getUsers } = props;

  const handleRefreshClick = () => {
    getUsers();
  };

  const handleAddClick = () => {
    const id = crypto.randomUUID();
    setRows((oldRows) => [...oldRows, { id: id, username: '', displayName: '', role: 'BASIC', sessions: [], isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'username' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<RefreshIcon />} onClick={handleRefreshClick}/>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleAddClick}>
        Add User
      </Button>
    </GridToolbarContainer>
  );
}

const useFakeMutation = () => {
  return React.useCallback(
    (user) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (user.username?.trim() === '') {
            reject(new Error("Error while saving user: name can't be empty."));
          } else {
            resolve({ ...user, username: user.username?.toLowerCase() });
          }
        }, 200);
      }),
    [],
  );
};

export default function UsersDataGrid() {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const axiosPrivate = useAxiosPrivate();
	const [UsersResponse, UsersError, UsersLoading, UsersAxiosFetch] = useAxiosFunction();
  const [UserDelResponse, UserDelError, UserDelLoading, UserDelAxiosFetch] = useAxiosFunction();
  const [UserCreateResponse, UserCreateError, UserCreateLoading, UserCreateAxiosFetch] = useAxiosFunction();
  const [UserUpdateResponse, UserUpdateError, UserUpdateLoading, UserUpdateAxiosFetch] = useAxiosFunction();
  const mutateRow = useFakeMutation();
  const [snackbar, setSnackbar] = useState(null);
  const effectRan = useRef(false);
  const location = useLocation();

  const handleCloseSnackbar = () => setSnackbar(null);


  const getUsers = () => {
		UsersAxiosFetch({
			axiosInstance: axiosPrivate,
			method: 'GET',
			url: 'api/users',
		});
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

  // Delete user message
	useEffect (() => {
		if (UserDelResponse?.length > 0) console.log(UserDelResponse);
    else console.log(UserDelError);
	},[UserDelResponse, UserDelError]);

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    const row = rows.find((row) => row.id === id)
    // If error, show message and cancel TODO
  };

  const handleDeleteClick = (id) => () => {
    const row = rows.find((row) => row.id === id)
    setRows(rows.filter((row) => row.id !== id));
    UserDelAxiosFetch({
			axiosInstance: axiosPrivate,
			method: 'DELETE',
			url: `api/users/${row.username}`,
		});
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

  // const processRowUpdate = useCallback(
  //   (newRow) => {
  //     console.log("processRowUpdate")
      
  //     const updatedRow = { ...newRow };
  //     setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
  //     console.log("UPDATED ROW"+JSON.stringify(updatedRow));
  //     if (updatedRow.isNew !== true) {
  //       console.log("SAVING EXISTING ROW");
  //       UserUpdateAxiosFetch({
  //         axiosInstance: axiosPrivate,
  //         method: 'PUT',
  //         url: `api/users/${updatedRow.id}`,
  //         requestConfig: updatedRow,
  //       });
  //       console.log(UserUpdateError);
  //       // Refresh table
  //     }
  //     else {
  //       console.log("SAVING NEW ROW");
  //       UserCreateAxiosFetch({
  //         axiosInstance: axiosPrivate,
  //         method: 'POST',
  //         url: `api/users/register`,
  //         requestConfig: updatedRow,
  //       });
  //       console.log("RESPONSE:"+UserCreateResponse)
  //     }
  //     return updatedRow;
  //   }, [mutateRow],
  // );

  const processRowUpdate = (newRow) => {
    console.log("processRowUpdate")
    
    const updatedRow = { ...newRow };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    console.log("UPDATED ROW"+JSON.stringify(updatedRow));
    if (updatedRow.isNew !== true) {
      console.log("SAVING EXISTING ROW");
      UserUpdateAxiosFetch({
        axiosInstance: axiosPrivate,
        method: 'PUT',
        url: `api/users/${updatedRow.id}`,
        requestConfig: updatedRow,
      });
      console.log(UserUpdateError);
      // Refresh table
    }
    else {
      console.log("SAVING NEW ROW");
      UserCreateAxiosFetch({
        axiosInstance: axiosPrivate,
        method: 'POST',
        url: `api/users/register`,
        requestConfig: updatedRow,
      });
      console.log("RESPONSE:"+UserCreateResponse)
    }
    return updatedRow;
  }

  const handleProcessRowUpdateError = useCallback((error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);


  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 30, align: 'left',
      headerAlign: 'left'},
    { field: 'username', headerName: 'Username', width: 180, align: 'left',
      headerAlign: 'left', editable: true
    },
    { field: 'password', headerName: 'Password', width: 30, align: 'left',
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
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
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
        onProcessRowUpdateError={handleProcessRowUpdateError}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, getUsers },
        }}
      />
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
      {!UsersLoading && UsersError && <b><Navigate to="/login" replace state={{ from: location }} /></b>}
    </Box>
  );
}