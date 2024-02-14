import Box from '@mui/system/Box';
import Divider from '@mui/material/Divider';
import Hero from '../components/Hero/Hero.jsx';

import FeatureShowcase from '../components/FeatureShowcase/FeatureShowcase.jsx';
import Footer from '../components/Footer/Footer.jsx';

export default function Landing() {
  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Hero />
      <FeatureShowcase />
      <Divider />
      <Footer />
    </Box>
  )
}
