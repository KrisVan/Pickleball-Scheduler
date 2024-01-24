import * as React from 'react';
import { useState } from 'react';
import { Link as RouterLink, Navigate } from 'react-router-dom'
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

function AlertDisplay(props) {
  var message = props.message;
  // Change text accordingly if error indicated in message
  if (message.includes("401")) {
    message = "Username already in use"
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

export default function SignUp() {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  // API request
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
      requestConfig:{
        username: data.get('username'),
        password: data.get('password'),
      }
    });
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
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
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
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
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
      {hasSubmitted && !loading && error && 
        <AlertDisplay severity="warning" message={error}/>
      }
      {hasSubmitted && !loading && !error && response &&
        <>
          <AlertDisplay 
            severity="success"
            message={"You are now registered! Now taking you to login."}
          />
          {/*<Navigate to="/login "/>*/}
        </>
      }
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}