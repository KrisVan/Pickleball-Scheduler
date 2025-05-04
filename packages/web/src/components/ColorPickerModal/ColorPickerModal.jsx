import { useRef } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button,
} from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

export default function ColorPickerModal({
  open, onClose, onSubmit, userColor, setUserColor,
}) {
  const prevColor = useRef(userColor);

  // Colors from https://mui.com/material-ui/customization/color/
  const colors = [
    { color: '#f44336', colorLight: '#f6685e' }, // red
    { color: '#e91e63', colorLight: '#ed4b82' }, // pink
    { color: '#9c27b0', colorLight: '#af52bf' }, // purple
    { color: '#673ab7', colorLight: '#8561c5' }, // deepPurple
    { color: '#3f51b5', colorLight: '#6573c3' }, // indigo
    { color: '#2196f3', colorLight: '#4dabf5' }, // blue
    { color: '#03a9f4', colorLight: '#35baf6' }, // lightBlue
    { color: '#00bcd4', colorLight: '#33c9dc' }, // cyan
    { color: '#009688', colorLight: '#33ab9f' }, // teal
    { color: '#4caf50', colorLight: '#6fbf73' }, // green
    { color: '#8bc34a', colorLight: '#a2cf6e' }, // lightGreen
    { color: '#cddc39', colorLight: '#d7e360' }, // lime
    { color: '#ffeb3b', colorLight: '#ffef62' }, // yellow
    { color: '#ffc107', colorLight: '#ffcd38' }, // amber
    { color: '#ff9800', colorLight: '#ffac33' }, // orange
    { color: '#ff5722', colorLight: '#ff784e' }, // deepOrange
  ];

  // Handlers
  const handleClose = () => {
    setUserColor(prevColor.current);
    onClose();
  };

  const handleSubmit = () => {
    prevColor.current = userColor;
    onSubmit();
  };

  const handleClick = (colorPair) => {
    setUserColor(colorPair.color);
  };

  function Item({ colorPair }) {
    return (
      <IconButton
        sx={{ p: 0 }}
        onClick={() => handleClick(colorPair)}
      >
        <Box
          sx={{
            width: 50,
            height: 50,
            bgcolor: colorPair.color,
            '&:hover': {
              bgcolor: colorPair.colorLight,
            },
          }}
        />
      </IconButton>
    );
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ pb: 2 }}>Choose a Color</DialogTitle>
      <DialogContent>
        <Grid container spacing={0} sx={{ maxWidth: 200 }}>
          {colors.map((colorPair, index) => (
            <Grid item key={index}>
              <Item colorPair={colorPair} />
            </Grid>
          ))}
        </Grid>

      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}> Cancel </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Select color
        </Button>
      </DialogActions>
    </Dialog>
  );
}
