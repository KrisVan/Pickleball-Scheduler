import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';

import useUser from '../hooks/useUser';

import Copyright from '../components/Copyright/Copyright';
import NextSession from '../components/NextSession/NextSession';
import BasicSessionDataGrid from '../components/SessionDataGrid/BasicSessionDataGrid';

export default function UserDashboard() {
  const { user } = useUser();

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[910],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3} justifyContent="center">
              {/* Next Session Card */}
              <Grid item xs={12} md={8} lg={9}>
                <NextSession />
              </Grid>
              {/* My Sessions List */}
              <Grid item >
                <BasicSessionDataGrid username={user.username}/>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      <Copyright sx={{mb: 4}}/>
    </>
  );
}