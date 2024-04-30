import { Box } from '@mui/material';
import { Container } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';

import Footer from '../components/Footer/Footer.jsx';

export default function About() {
  const bio = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

	return(
    <>
      <Container
        // maxWidth="lg"
        sx={{
          mt: { xs: 8, sm: 10 }, 
          mx:{ xs: 2, sm: 5 },
        }}
      >
        <Typography
          component="h1"
          variant="h1"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          About
        </Typography>
        <Grid
          container
          direction="row"
          wrap='nowrap'
          spacing={10}
          justifyContent="space-evenly"
          alignItems="flex-start"
        >
          <Grid item xs={false}>
            <Typography
              component="body1"
              variant="h4"
              color="inherit"
              paragraph={true}
              noWrap={false}
              sx={{ flexGrow: 1 }}
            >
              {bio}
            </Typography>
          </Grid>
          <Grid item xs={100}>
            <Box
              id="image"
              sx={{
                mt: { xs: 4, sm: 1 },
                alignSelf: 'center',
                height: { xs: 200, sm: 700 },
                width: '100%',
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                backgroundImage: 'url("images/krisProfile.png")',
                backgroundSize: 'contained',
              }}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
    
)
}
