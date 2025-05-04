import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// Hooks/API
import axios from '../../api/axios.jsx';
import useAxiosFunction from '../../hooks/useAxiosFunction.jsx';
// Local Components
import SimpleBackdrop from '../SimpleBackDrop/SimpleBackdrop.jsx';
import Copyright from '../Copyright/Copyright.jsx';

// Alert for server responses
function ResponseAlert(props) {
  let { message } = props;
  // Change text accordingly if error indicated in message
  if (message.includes('401')) {
    message = 'Username already in use';
  }
  return (
    <Alert
      sx={{ mt: 2, mb: 4 }}
      {...props}
    >
      {message}
    </Alert>
  );
}

export default function SignUp() {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [matchError, setMatchError] = useState('');
  const [isValidationError, setIsValidationError] = useState(false);

  // Fetch API request
  const [response, error, loading, axiosFetch] = useAxiosFunction();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setHasSubmitted(true);
    // Get submitted username and password
    axiosFetch({
      axiosInstance: axios,
      method: 'POST',
      url: 'api/users/register',
      requestConfig: {
        username: data.get('username'),
        password: data.get('password'),
      },
    });
  };

  // Check if error is present after error state changes
  useEffect(() => {
    if (usernameError || passwordError || matchError) {
      setIsValidationError(true);
    } else {
      setIsValidationError(false);
    }
  }, [usernameError, passwordError, matchError]);

  // Validate username
  const validateUsernameOnChange = (username) => {
    // If not between 3-24 chars
    if (!(/^.{3,24}$/.test(username))) {
      setUsernameError('Username must be between 3 and 24 characters');
      return false;
    }
    // If not any combination of letters, digits, and underscores
    if (!(/^[a-zA-Z0-9_]+$/.test(username))) {
      setUsernameError('Username can only contain letters, digits, and underscores');
      return false;
    }
    setUsernameError('');
    return true;
  };

  // Validate password
  const validatePasswordOnChange = (password) => {
    setPassword(password);
    // If not between 6-24 chars
    if (!(/^.{6,24}$/.test(password))) {
      setPasswordError('Password must be between 6 and 24 characters');
      return false;
    }
    // If not any combination of letters, digits, or non closure special chars
    if (!(/^[a-zA-Z0-9!@#$%^&*_\-+=|:;<>,.?/\\~`"]+$/.test(password))) {
      setPasswordError('Password can only contain letters, digits, and non closure special characters');
      return false;
    }
    // Check if password matches confirmation password
    if (confirmationPassword === password) {
      setPasswordError('');
      setMatchError('');
    } else {
      setMatchError('Passwords must match');
    }
    setPasswordError('');
    return true;
  };

  // Check if confirm passwords match
  const matchPasswordOnChange = (confirmationPassword) => {
    setConfirmationPassword(confirmationPassword);
    // If confirm password does not match the password
    if (confirmationPassword !== password) {
      setMatchError('Passwords must match');
    } else {
      setMatchError('');
    }
  };

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
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={(event) => validateUsernameOnChange(event.target.value)}
                error={!!(usernameError && usernameError.length)}
                helperText={usernameError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(event) => validatePasswordOnChange(event.target.value)}
                error={!!(passwordError && passwordError.length)}
                helperText={passwordError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                onChange={(event) => matchPasswordOnChange(event.target.value)}
                error={!!(matchError && matchError.length)}
                helperText={matchError}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            disabled={!!isValidationError}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {hasSubmitted && loading && <SimpleBackdrop />}
      {hasSubmitted && !loading && error
        && <ResponseAlert severity="warning" message={error} />}
      {hasSubmitted && !loading && !error && response
        && (
        <ResponseAlert
          severity="success"
          message="You are now registered!"
          action={(
            <Button
              color="inherit"
              size="small"
              component={RouterLink}
              to="/login"
            >
              Login
            </Button>
            )}
        />
        )}
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
