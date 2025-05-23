import {
  Box, Container, Grid, Typography,
} from '@mui/material';

import Divider from '@mui/material/Divider';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Footer from '../components/Footer/Footer.jsx';

export default function About() {
  const bio = `I'm a developer with experience in full-stack web development and machine learning. I've worked on
    collaborative scheduling apps and built machine learning models for Amazon review classification. Proficient in
    JavaScript, Java, Python, and frameworks like ReactJS and Express, I enjoy solving complex problems and learning
    new technologies. I hold a degree in computer science from George Mason University, where I gained a solid
    foundation in both theory and practice. I'm dedicated to delivering high-quality solutions and continually 
    improving my skills.`;
  return (
    <>
      <Container
        sx={{
          my: { xs: 2, sm: 4, md: 6 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: { xs: 'center', md: 'flex-start' },
        }}
      >
        <Typography
          component="h1"
          variant="h3"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1, mb: 1, textAlign: { xs: 'center', md: 'left' } }}
        >
          About
        </Typography>
        <Grid
          container
          wrap="nowrap"
          spacing={2}
          sx={{
            flexDirection: { xs: 'column', md: 'row' },
          }}
          justifyContent="space-evenly"
          alignItems={{ xs: 'center', md: 'flex-start' }}
        >
          <Grid item xs md={6} order={{ xs: 2, sm: 2, md: 1 }}>
            <Typography
              component="body1"
              variant="body1"
              color="text.secondary"
              paragraph
              noWrap={false}
            >
              {bio}
            </Typography>
          </Grid>
          <Grid item xs md={6} order={{ xs: 1, sm: 1, md: 2 }}>
            <Box
              id="image"
              sx={{
                alignSelf: 'center',
                height: 550,
                width: { xs: 470, sm: 570, md: '100%' },
                minWidth: 300,
                mb: 1,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundOrigin: 'center center',
                backgroundImage: 'url("images/krisProfile.png")',
                backgroundSize: 'contained',
              }}
            />
            <Stack
              direction="row"
              spacing={{ xs: 0, sm: 2, md: 4 }}
              useFlexGap
              flexWrap="wrap"
              sx={{
                color: 'text.secondary',
              }}
            >
              <IconButton
                color="inherit"
                href="https://github.com/KrisVan/"
                target="_blank"
                aria-label="GitHub Profile"
              >
                <GitHubIcon fontSize="medium" />
                <Typography
                  color="inherit"
                  variant="body1"
                  component="subtitle"
                  align="center"
                  mx={1}
                >
                  GitHub
                </Typography>
              </IconButton>
              <IconButton
                color="inherit"
                href="https://www.linkedin.com/in/kristopher-van-71b339274/"
                target="_blank"
                aria-label="LinkedIn Profile"
                sx={{ alignSelf: 'center' }}
              >
                <LinkedInIcon fontSize="medium" />
                <Typography
                  color="inherit"
                  variant="body1"
                  component="subtitle"
                  align="center"
                  mx={1}
                >
                  LinkedIn
                </Typography>
              </IconButton>
            </Stack>

          </Grid>
        </Grid>
      </Container>
      <Divider />
      <Footer />
    </>

  );
}
