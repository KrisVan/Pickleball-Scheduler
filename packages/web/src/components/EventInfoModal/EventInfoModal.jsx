import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Tooltip } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useUser from "../../hooks/useUser"
import UsersWithinInterval from "../UsersWithinInterval/UsersWithinInterval.jsx";

export default function EventInfoModal({ open, handleClose, handleEditSlot, onDeleteEvent, currentEvent, events }) {
  const { user } = useUser();

  const onClose = () => {
    handleClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogActions>
      {currentEvent?.username === user?.username ?
      <>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <DialogTitle sx={{ pb: "0px" }}>Event Info</DialogTitle>
        </Grid>
        <Tooltip title="Edit">
          <IconButton
            aria-label="Edit event information"
            color="inherit"
            onClick={handleEditSlot}
            sx={{ p: 1 }}
          >
            <EditIcon size="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            aria-label="Delete your session"
            color="inherit"
            onClick={onDeleteEvent}
            sx={{ p: 1 }}
          >
            <DeleteIcon size="small" />
          </IconButton>
        </Tooltip>
          <Tooltip title="Close">
            <IconButton
              aria-label="Close event information"
              color="inherit"
              onClick={onClose}
              sx={{ p: 1 }}
            >
              <CloseIcon size="small" />
            </IconButton>
          </Tooltip>
        </>
        :
        <>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <DialogTitle sx={{ pb: "0px" }}>Event Info</DialogTitle>
          </Grid>
        </>
      }
      </DialogActions>
      <DialogContent sx={{ pt: "0px" }}>
        <UsersWithinInterval currentEvent={currentEvent} events={events}/>
      </DialogContent>
    </Dialog>
  );
}