import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
} from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import compareDesc from 'date-fns/compareDesc';

export default function EditEventModal(props) {
  const {
    open, handleClose, currentEvent, setCurrentEvent, onEditEvent,
  } = props;

  const onClose = () => handleClose();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit session</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mx: 1 }}>To edit a session, please confirm the information below.</DialogContentText>
        <Box component="form">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box mb={2} mt={5}>
              <DateTimePicker
                label="Start date"
                value={currentEvent?.startTime}
                ampm
                minutesStep={30}
                onChange={(newValue) => setCurrentEvent((prevState) => ({
                  ...prevState,
                  startTime: new Date(newValue),
                }))}
                textField={(params) => <TextField {...params} />}
              />
            </Box>
            <DateTimePicker
              label="End date"
              minDate={currentEvent?.startTime}
              minutesStep={30}
              ampm
              value={currentEvent?.endTime}
              onChange={(newValue) => setCurrentEvent((prevState) => ({
                ...prevState,
                endTime: new Date(newValue),
              }))}
              textField={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={(currentEvent?.startTime === null || currentEvent?.endTime === null)
          || compareDesc(currentEvent?.startTime, currentEvent?.endTime) !== 1}
          color="success"
          onClick={onEditEvent}
        >
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
