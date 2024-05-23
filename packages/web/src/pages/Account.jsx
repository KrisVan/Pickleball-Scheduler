import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Footer from '../components/Footer/Footer.jsx';
import PaletteIcon from '@mui/icons-material/Palette';
import IconButton from '@mui/material/IconButton';

import ColorPickerModal from '../components/ColorPickerModal/ColorPickerModal.jsx';
import DeleteAccountModal from '../components/DeleteAccountModal/DeleteAccountModal';
import useUser from '../hooks/useUser.jsx';
import useRefreshToken from '../hooks/useRefreshToken.jsx';
import useAxiosPrivate from '../hooks/useAxiosPrivate.jsx';
import useAxiosFunction from '../hooks/useAxiosFunction.jsx';

export default function Account() {
  const { user } = useUser();
  const location = useLocation();

  const [isChange, setIsChange] = useState(false);
  const [isPasswordChange, setIsPasswordChange] = useState(false);
  const [userColor, setUserColor] = useState(user.color);
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const [displayNameError, setDisplayNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [matchError, setMatchError] = useState('');
  const [isValidationError, setIsValidationError] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openColorModal, setOpenColorModal] = useState(false);

  const [UserUpdateResponse, UserUpdateError, UserUpdateLoading, UserUpdateAxiosFetch] = useAxiosFunction();
  const [UserUpdateSettingsResponse, UserUpdateSettingsError, UserUpdateSettingsLoading, UserUpdateSettingsAxiosFetch] = useAxiosFunction();
  const [UserDeleteResponse, UserDeleteError, UserDeleteLoading, UserDeleteAxiosFetch] = useAxiosFunction();

  const axiosPrivate = useAxiosPrivate();
  const refresh = useRefreshToken();
  const themes = [{ value: 'DARK', label: 'Dark' }, { value: 'LIGHT', label: 'Light' }]

  // Handlers
  function handleCancel() {
    // Set fields to default values
    document.getElementById("settings").reset();
    // Set states to initial values
    setUserColor(user.color);
    setConfirmationPassword('');
    setDisplayNameError('');
    setPasswordError('');
    setMatchError('');
    setIsPasswordChange(false);
    setIsChange(false);
  }

  function handleConfirm(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("confirm");

    // Request to update user
    // UserUpdateAxiosFetch({
    //   axiosInstance: axiosPrivate,
    //   method: 'PUT',
    //   url: `api/users/${user.id}`,
    //   requestConfig: {
    //   },
    // });

    // Update user settings
    UserUpdateSettingsAxiosFetch({
      axiosInstance: axiosPrivate,
      method: 'PUT',
      url: `api/users/${user.username}/settings`,
      requestConfig: {
        username: user.username,
        color: userColor,
        theme: data.get('theme')
      },
    });
    
    // Set states to initial values
    setConfirmationPassword('');
    setDisplayNameError('');
    setPasswordError('');
    setMatchError('');
    setIsPasswordChange(false);
    setIsChange(false);
  }

  // Update user context by refreshing info
  useEffect(() => { 
    refresh();
  },[UserUpdateResponse, UserUpdateSettingsResponse]);

  function handleDelete() {
    console.log("Account deleted");
    setOpenDeleteModal(false);

    // Logout and take to home

  }

  function handleCloseDeleteModal() {
    setOpenDeleteModal(false);
  }

  function handleClickDeleteOpenModal() {
    setOpenDeleteModal(true);
  }

  function handleColorSubmit() {
    setIsChange(true);
    setOpenColorModal(false);
  }

  function handleCloseColorModal() {
    setOpenColorModal(false);
  }

  function handleClickOpenColorModal() {
    setOpenColorModal(true);
  }

  // Validate username
  const validateDisplayNameOnChange = (displayName) => {
    setIsChange(true)
    // If not between 3-24 chars
    if (!(/^.{3,24}$/.test(displayName))){
      setDisplayNameError("Display name must be between 3 and 24 characters");
      return false;
    }
    // If not any combination of letters, digits, and underscores
    if (!(/^[a-zA-Z0-9_]+$/.test(displayName))){
      setDisplayNameError("Display name can only contain letters, digits, and underscores");
      return false;
    }
    setDisplayNameError("");
    return true;
  }

  // Validate password
  const validatePasswordOnChange = (password) => {
    setIsChange(true);
    setIsPasswordChange(true);
    setPassword(password);
    // If not between 6-24 chars
    if (!(/^.{6,24}$/.test(password))){
      setPasswordError("Password must be between 6 and 24 characters")
      return false;
    }
    // If not any combination of letters, digits, or non closure special chars
    else if (!(/^[a-zA-Z0-9!@#$%^&*_\-+=|:;<>,.?/\\~`"]+$/.test(password))){
      setPasswordError("Password can only contain letters, digits, and non closure special characters");
      return false;
    }
    // Check if password matches confirmation password
    if (confirmationPassword === password){
      setPasswordError('')
      setMatchError('')
    }
    else{
      setMatchError("Passwords must match");
    }
    setPasswordError('');
    return true;
  }

  // Check if confirm passwords match
  const matchPasswordOnChange = (confirmationPassword) => {
    setIsChange(true)
    setConfirmationPassword(confirmationPassword);
    // If confirm password does not match the password
    if (confirmationPassword !== password){
      setMatchError("Passwords must match");
    }
    else {
      setMatchError('');
    }
  }

  // Check if error is present after error state changes
  useEffect(() => {
    if (displayNameError || passwordError || matchError) {
      setIsValidationError(true);
    }
    else {
      setIsValidationError(false);
    }
  },[displayNameError, passwordError, matchError])


	return(
    <>
      <Container
        sx={{
          my: { xs: 2, sm: 4, md: 6},
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: {xs: 'center', md: 'flex-start'},
        }}
      >
        <Typography
          component="h1"
          variant="h3"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1, mb:1, textAlign: {xs: "center", md: "left"}, }}
        >
          Account Settings
        </Typography>
        <Grid container
          component="form"
          id="settings"
          onSubmit={handleConfirm}
          noValidate
          wrap='nowrap'
          spacing={2}
          sx={{
            mt:4,
            flexDirection: { xs: "column", md: "row" },
          }}
          justifyContent="space-evenly"
          alignItems={{xs: 'center', md: 'flex-start'}}
        >
          <Grid item xs={true} md={6} order={{ xs: 2, sm: 2, md: 2 }}>
            <Stack
              spacing={2}
              divider={<Divider flexItem />}
              sx={{width: { xs: 470, sm: 570, md:'100%' }}}
            >
              <TextField
                disabled
                variant="standard"
                id="username"
                label="Username"
                name="username"
                autoComplete='off'
                defaultValue={user.username}
              />
              <TextField
                variant="standard"
                id="displayName"
                label="Display Name"
                name="displayName"
                autoComplete='off'
                defaultValue={user.displayName}
                onChange={(event) => validateDisplayNameOnChange(event.target.value)}
                error={displayNameError && displayNameError.length ? true : false}
                helperText={displayNameError}
              />
              <>
                <TextField
                  variant="standard"
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  placeholder={"••••••"}
                  autoComplete="new-password"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event) => validatePasswordOnChange(event.target.value)}
                  error={passwordError && passwordError.length ? true : false}
                  helperText={passwordError}
                />
                {isPasswordChange === true &&
                  <TextField
                    variant="standard"
                    id="confirmPassword"
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    defaultValue=""
                    autoComplete="new-password"
                    onChange={(event) => matchPasswordOnChange(event.target.value)}
                    error={matchError && matchError.length ? true : false}
                    helperText={matchError}
                  />
                }
              </>
              <TextField
                select
                variant="standard"
                id="theme"
                label="Theme"
                name="theme"
                defaultValue={user.theme}
                onChange={()=>setIsChange(true)}
              >
                {themes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                variant="outlined"
                color="error"
                onClick={handleClickDeleteOpenModal}
              >
                  Delete Account
              </Button>
              {isChange === true && 
              <Stack spacing={2} direction="row">
                <Button variant="outlined" onClick={handleCancel}> Cancel </Button>
                <Button
                  variant="contained"
                  type="submit"
                  disabled= { isValidationError ? true : false}
                >
                  Confirm Changes
                </Button> 
              </Stack>}
            </Stack>
          </Grid>
          <Grid item xs={true} md={6} order={{ xs: 1, sm: 1, md: 1 }}>
            <Badge
              badgeContent={
                <PaletteIcon
                  color='text.primary'
                  sx={{
                    height: { xs: 80, sm: 100, md: 50 },
                    width: { xs: 80, sm: 100, md: 50 },
                  }}
                />
              }
              overlap="circular"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              <IconButton
                aria-label="Profile Color"
                onClick={handleClickOpenColorModal}
                sx={{
                  justifyContent: 'center',
                  height: { xs: 490, sm: 590, md:320 },
                  width: { xs: 490, sm: 590, md:320 },
                  pt:{ xs: 9, sm: 11, md:3 },
                }}
              >
              <Avatar
                sx={{
                  alignSelf: 'center',
                  color: 'inherit',
                  bgcolor: `${userColor}`, 
                  height: { xs: 470, sm: 570, md:300 },
                  width: { xs: 470, sm: 570, md:300 },
                  mb: { xs: 8, sm: 10, md: 2 },
                }}
              >
                {user.username && user.username[0].toUpperCase()}
              </Avatar>
              </IconButton>
            </Badge>
          </Grid>
        </Grid>
      </Container>
      <DeleteAccountModal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        onDelete={handleDelete}
      />
      <ColorPickerModal
        open={openColorModal}
        onClose={handleCloseColorModal}
        onSubmit={handleColorSubmit}
        userColor={userColor}
        setUserColor={setUserColor}
      />
      <Divider />
      <Footer />
      {!UserUpdateLoading && UserUpdateError.includes("500") &&
        <Navigate to="/login" replace state={{ from: location }} />}
      {!UserUpdateSettingsLoading && UserUpdateSettingsError.includes("500") &&
        <Navigate to="/login" replace state={{ from: location }} />}
      {!UserDeleteLoading && UserDeleteError.includes("500") &&
        <Navigate to="/login" replace state={{ from: location }} />}
    </>
    
)
}
