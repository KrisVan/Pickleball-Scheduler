import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
// Hooks
import useLogout from '../../hooks/useLogout';
import useUser from '../../hooks/useUser';

export default function SignOut() {
  const logout = useLogout();
  const { user } = useUser();

  const logoutFunction = async () => {
    await logout();
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {user?.username
          ? 
          <>
            <Typography variant="body">Signed in as {user?.username}</Typography>
              <Button
                type="click"
                variant="contained"
                sx={{ mt: 3, mb: 2, width: 120}}
                onClick={logoutFunction}
                
              >
                Sign Out
              </Button>
          </>
          : <Alert
              severity="info"
              sx={{ mt: 2, mb: 4}}
              action={
                <Button
                  color="inherit"
                    size="small"
                    component={RouterLink}
                    to="/login"
                  >
                  Login
                </Button>
              }
            >
              No user logged in
            </Alert>
        }
      </Box>
    </Container>
  )
}
