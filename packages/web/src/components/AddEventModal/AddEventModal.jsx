
import { useEffect } from "react"
import { Link } from "react-router-dom"
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
} from "@mui/material"
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import compareDesc from "date-fns/compareDesc"

import useUser from "../../hooks/useUser"

export default function AddEventModal(props) {
  const {open, handleClose, currentEvent, setCurrentEvent, onAddEvent} = props;
  const { user } = useUser();

  const onClose = () => handleClose()

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add session</DialogTitle>

      { user?.username ?
        <>
          <DialogContent>
            <DialogContentText sx={{mx: 1}}>To create a session, please confirm the information below.</DialogContentText>
            <Box component="form">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box mb={2} mt={5}>
                  <DateTimePicker
                    label="Start date"
                    value={currentEvent?.start}
                    ampm={true}
                    minutesStep={30}
                    onChange={(newValue) =>
                      setCurrentEvent((prevState) => ({
                        ...prevState,
                        start: new Date(newValue),
                      }))
                    }
                    textField={(params) => <TextField {...params} />}
                  />
                </Box>
                <DateTimePicker
                  label="End date"
                  minDate={currentEvent?.start}
                  minutesStep={30}
                  ampm={true}
                  value={currentEvent?.end}
                  onChange={(newValue) =>
                    setCurrentEvent((prevState) => ({
                      ...prevState,
                      end: new Date(newValue),
                    }))
                  }
                  textField={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={currentEvent?.start === null || currentEvent?.end === null || 
              compareDesc(currentEvent?.start, currentEvent?.end) !== 1} color="success" onClick={onAddEvent}>
              Add
            </Button>
          </DialogActions>
        
        </>
        :
        <>
          <DialogContentText sx={{mx: 1}}>To create a session, please login</DialogContentText>
          <DialogActions>
            <Button color="error" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              component={Link}
              to={`/login`}
              key={'/login'}
            >
              Login
            </Button>
          </DialogActions>
        </>
      }
    </Dialog>
  );
}