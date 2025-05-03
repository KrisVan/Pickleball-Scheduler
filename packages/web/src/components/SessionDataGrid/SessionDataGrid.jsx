import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
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

function ISOStringToDateTime(ISOString) {
  const b = ISOString.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

function EditToolbar(props) {
  const { setRows, setRowModesModel, getSessions } = props;

  const handleRefreshClick = () => {
    getSessions();
  };

  const handleAddClick = () => {
    const id = crypto.randomUUID();
    const currentDate = new Date();
    currentDate.setTime(currentDate.getTime() + (60 * 60 * 1000));
    setRows((oldRows) => [...oldRows,
      {
        id,
        username: '',
        startTime: new Date().toISOString(),
        endTime: currentDate.toISOString(),
        creationDate: new Date().toISOString(),
        user: {},
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'username' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Typography
        sx={{ mx: 1 }}
        variant="h5"
        id="DataGridTitle"
        component="div"
      >
        Sessions
      </Typography>
      <Button color="primary" startIcon={<RefreshIcon />} onClick={handleRefreshClick}>
        Refresh
      </Button>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleAddClick}>
        Add Session
      </Button>
    </GridToolbarContainer>
  );
}

export default function SessionsDataGrid() {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const axiosPrivate = useAxiosPrivate();
  const [SessionsResponse, SessionsError, SessionsLoading, SessionsAxiosFetch] = useAxiosFunction();
  const [SessionCreateResponse, SessionCreateError, , SessionCreateAxiosFetch] = useAxiosFunction();
  const [SessionUpdateResponse, SessionUpdateError, , SessionUpdateAxiosFetch] = useAxiosFunction();
  const [SessionDelResponse, SessionDelError, , SessionDelAxiosFetch] = useAxiosFunction();
  const [snackbar, setSnackbar] = useState(null);
  const effectRan = useRef(false);
  const sessionDelRan = useRef(false);
  const location = useLocation();

  const handleCloseSnackbar = () => setSnackbar(null);

  const getSessions = () => {
    SessionsAxiosFetch({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: 'api/sessions',
    });
  };

  // Set sessions after mount
  useEffect(() => {
    if (SessionsResponse?.length !== 0) {
      setRows(SessionsResponse);
    }
  }, [SessionsResponse]);

  // Get sessions on mount
  useEffect(() => {
    if (effectRan.current === false) {
      getSessions();
    }
    return () => {
      effectRan.current = true;
    };
    // eslint-disable-next-line
	},[]);

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
    const row = rows.find((row) => row.id === id);
    setRows(rows.filter((row) => row.id !== id));
    sessionDelRan.current = true;
    SessionDelAxiosFetch({
      axiosInstance: axiosPrivate,
      method: 'DELETE',
      url: `api/sessions/${row.id}`,
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

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow };
    if (updatedRow.isNew !== true) {
      SessionUpdateAxiosFetch({
        axiosInstance: axiosPrivate,
        method: 'PUT',
        url: `api/sessions/${updatedRow.id}`,
        requestConfig: updatedRow,
      });
    } else {
      SessionCreateAxiosFetch({
        axiosInstance: axiosPrivate,
        method: 'POST',
        url: `api/users/${updatedRow.username}/sessions`,
        requestConfig: updatedRow,
      });
    }
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  // CRUD Error messages
  const handleProcessRowUpdateError = (error) => {
    setSnackbar({ children: error, severity: 'error' });
  };

  useEffect(() => {
    if (SessionCreateError) {
      if (SessionCreateError.includes(404)) {
        handleProcessRowUpdateError('User does not exist');
      } else if (SessionCreateError.includes(400)) {
        handleProcessRowUpdateError('Start time must be before end time');
      } else handleProcessRowUpdateError(SessionCreateError);
      getSessions();
    }
    // eslint-disable-next-line
  },[SessionCreateError]);
  useEffect(() => {
    if (SessionUpdateError) {
      if (SessionUpdateError.includes(404)) {
        handleProcessRowUpdateError('User does not exist');
      } else if (SessionUpdateError.includes(400)) {
        handleProcessRowUpdateError('Start time must be before end time');
      } else handleProcessRowUpdateError(SessionCreateError);
      getSessions();
    }
    // eslint-disable-next-line
  },[SessionUpdateError]);
  useEffect(() => {
    if (SessionDelError) {
      handleProcessRowUpdateError(SessionDelError);
    }
  }, [SessionDelError]);

  // CRUD Response messages
  const handleProcessRowUpdateResponse = (response) => {
    setSnackbar({ children: response, severity: 'success' });
  };

  useEffect(() => {
    if (SessionCreateResponse?.length !== 0) {
      handleProcessRowUpdateResponse('Session created');
      getSessions();
    }
    // eslint-disable-next-line
  },[SessionCreateResponse]);
  useEffect(() => {
    if (SessionUpdateResponse?.length !== 0) {
      handleProcessRowUpdateResponse('Session updated');
      getSessions();
    }
    // eslint-disable-next-line
  },[SessionUpdateResponse]);
  useEffect(() => {
    if (SessionDelResponse && sessionDelRan.current === true) {
      handleProcessRowUpdateResponse('Session deleted');
    }
  }, [SessionDelResponse]);

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 30,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'username',
      headerName: 'User',
      width: 120,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'startTime',
      type: 'dateTime',
      headerName: 'Start Time',
      width: 200,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      valueGetter: (params) => ISOStringToDateTime(params?.row?.startTime),
      valueSetter: (params) => {
        let startTime = null;
        startTime = params?.value?.toISOString();
        return { ...params.row, startTime };
      },
    },
    {
      field: 'endTime',
      type: 'dateTime',
      headerName: 'End Time',
      width: 200,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      valueGetter: (params) => ISOStringToDateTime(params?.row?.endTime),
      valueSetter: (params) => {
        let endTime = null;
        endTime = params?.value?.toISOString();
        return { ...params.row, endTime };
      },
    },
    {
      field: 'creationDate',
      type: 'dateTime',
      headerName: 'Created',
      width: 200,
      align: 'left',
      headerAlign: 'left',
      valueGetter: (params) => ISOStringToDateTime(params?.row?.creationDate),
      valueSetter: (params) => {
        let creationDate = null;
        creationDate = params?.value?.toISOString();
        return { ...params.row, creationDate };
      },
    },
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
              key="save"
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key="cancel"
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
            key="edit"
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key="delete"
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
        density="compact"
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        // onProcessRowUpdateError={handleProcessRowUpdateError}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, getSessions },
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
      {!SessionsLoading && SessionsError && <b><Navigate to="/login" replace state={{ from: location }} /></b>}
    </Box>
  );
}
