import * as React from 'react';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom'
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
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
// Hooks/API
import axios from '../../api/axios.jsx';
import useAxiosFunction from '../../hooks/useAxiosFunction.jsx';

function AlertDisplay(props) {
  var message = props.message;
  // Change text accordingly if error indicated in message
  if (message.includes("400")) {
    message = "Username and Password must be at least 6 characters long."
  }
  if (message.includes("401")) {
    message = "Invalid username or password."
  }
  // Alert display
  return (
    <Alert 
      sx={{ mt: 2, mb: 4}}
      {...props}
    >
      {message}
    </Alert>
  );
}

export function SimpleBackdrop() {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" component={RouterLink} to="/about">
        PickLeTime
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn() {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  // API request
  const [response, error, loading, axiosFetch] = useAxiosFunction();

  // Handle sumbit of data
  const handleSubmit = (event) => { 
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setHasSubmitted(true);
    // Get submitted username and password
    axiosFetch({
      axiosInstance: axios,
      method: 'POST',
      url: 'api/users/login',
      requestConfig:{
        username: data.get('username'),
        password: data.get('password'),
      }
    });
  };

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
            control={<Checkbox value="remember" color="primary" />}
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
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {hasSubmitted && loading && <SimpleBackdrop />}
      {hasSubmitted && !loading && error && 
        <AlertDisplay severity="warning" message={error}/>
      }
      {hasSubmitted && !loading && !error && response &&
        <AlertDisplay 
          severity="success"
          message={"Success! You are now logged in."}
        />
      }
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}