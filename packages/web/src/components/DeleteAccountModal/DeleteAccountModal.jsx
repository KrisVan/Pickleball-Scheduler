import { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material"
import TextField from '@mui/material/TextField';
import useUser from "../../hooks/useUser.jsx"

export default function DeleteAccountModal({ open, onClose, onDelete}) {
  const { user } = useUser();
  const [isUsernameMatching, setIsUsernameMatching] = useState(false);

  // Handlers
  const handleClose = () => {
    setIsUsernameMatching(false);
    onClose();
  }

  const handleDelete = () => {
    onDelete();
  }

  // Check if field and username match
  const matchUsernameOnChange = (username) => {
    if (user.username !== username){
      setIsUsernameMatching(false);
    }
    else {
      setIsUsernameMatching(true);
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ pb: 2 }}>Delete Account?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
        All data will be lost. Deleting your account will be irreversible.
        </DialogContentText>
        <TextField
          fullWidth
          variant="outlined"
          id="username"
          label={user.username}
          name="username"
          type="username"
          helperText="Type in your username to confirm deletion"
          autoComplete="off"
          onChange={(event) => matchUsernameOnChange(event.target.value)}
          sx={{mt:2}}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}> Cancel </Button>
        <Button
          variant="contained"
          color="error"
          disabled={!isUsernameMatching}
          onClick={handleDelete}
        >
          Delete Account
        </Button>
      </DialogActions>
    </Dialog>
  );
}