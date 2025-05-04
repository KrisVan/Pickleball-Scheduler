import { useState, useEffect } from 'react';
import { Link as RouterLink, Navigate, useLocation } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// Hooks/API/Providers
import axios from '../../api/axios.jsx';
import useAxiosFunction from '../../hooks/useAxiosFunction.jsx';
import useUser from '../../hooks/useUser.jsx';
// Local Components
import SimpleBackdrop from '../SimpleBackDrop/SimpleBackdrop.jsx';
import Copyright from '../Copyright/Copyright.jsx';

function AlertDisplay(props) {
  let { message } = props;
  // Change text accordingly if error indicated in message
  if (message.includes('400')) {
    message = 'Password must be at least 6 characters long.';
  }
  if (message.includes('401')) {
    message = 'Invalid username or password.';
  }
  // Alert display
  return (
    <Alert
      sx={{ mt: 2, mb: 4 }}
      {...props}
    >
      {message}
    </Alert>
  );
}

export default function SignIn() {
  const { user, setUser, setPersist } = useUser();

  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  // API request
  const [response, error, loading, axiosFetch] = useAxiosFunction();
  const [settingsResponse, settingsError, settingsLoading, settingsAxiosFetch] = useAxiosFunction();

  // Handle sumbit of data
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setHasSubmitted(true);
    // Get submitted username and password
    axiosFetch({
      axiosInstance: axios,
      method: 'POST',
      url: 'api/auth/login',
      requestConfig: {
        username: data.get('username'),
        password: data.get('password'),
      },
    });
    // Get user settings
    settingsAxiosFetch({
      axiosInstance: axios,
      method: 'GET',
      url: `api/users/${data.get('username')}/settings`,
    });
  };

  // Handle remember me checkboc
  const handleTogglePersist = (event) => {
    setRememberMe(event.target.checked);
  };

  // Set user context with user data and user settings, and persist
  useEffect(() => {
    if (response.length !== 0 && settingsResponse.length !== 0 && hasSubmitted) {
      setUser({ ...response, ...settingsResponse });
      localStorage.setItem('persist', rememberMe);
      setPersist(rememberMe);
    }
  }, [response, settingsResponse, hasSubmitted, user, setUser, rememberMe, setPersist]);

  // Render sign in component
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={(
              <Checkbox
                value="remember"
                color="primary"
                checked={rememberMe}
                onChange={handleTogglePersist}
              />
)}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} to="/about" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                Don&apos;t have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {hasSubmitted && loading && settingsLoading && <SimpleBackdrop />}
      {hasSubmitted && !loading && !loading && error
        && <AlertDisplay severity="warning" message={error} />}
      {hasSubmitted && !settingsLoading && settingsError
        && <AlertDisplay severity="warning" message={settingsError} />}
      {hasSubmitted && !loading && !error && response && !settingsLoading
        && !settingsError && settingsResponse
        && (
        <>
          <AlertDisplay
            severity="success"
            message="You are now logged in! Now taking you to dashboard."
          />
          <Navigate to={from} replace />
        </>
        )}
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
