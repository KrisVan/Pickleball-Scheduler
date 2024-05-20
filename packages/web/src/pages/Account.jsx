import { Avatar } from '@mui/material';
import { Container } from '@mui/material';
import Divider from '@mui/material/Divider';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Footer from '../components/Footer/Footer.jsx';

import useUser from '../hooks/useUser.jsx';

export default function Account() {

  const { user } = useUser();

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
            {/* <Stack spacing={2} divider={<Divider flexItem />}>
              <TextField
                disabled
                id="username"
                variant="standard"
                label="Username"
                defaultValue={user.username}
              />
              <TextField
                id="displayName"
                variant="standard"
                label="Display Name"
                defaultValue={user.displayName}
              />
              <TextField
                id="password"
                variant="standard"
                label="Password"
                defaultValue="####"
              />
            </Stack> */}
          </Grid>
          <Grid item xs={true} md={6} order={{ xs: 1, sm: 1, md: 1 }}>
            <Avatar 
              sx={{
                alignSelf: 'center',
                color: 'inherit',
                bgcolor: `${user.color}`, 
                height: { xs: 470, sm: 570, md:300 },
                width: { xs: 470, sm: 570, md:300 },
                mb: { xs: 8, sm: 10, md: 2 },
              }}
            >
              {user.username && user.username[0].toUpperCase()}
            </Avatar>
          </Grid>
        </Grid>
      </Container>
      <Divider />
      <Footer />
    </>
    
)
}
