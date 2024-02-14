import { Outlet } from 'react-router-dom';
import Box from '@mui/system/Box';
import AppBar from '../AppBar/AppBar.jsx';

export default function Layout() {
  return (
    <Box>
      <AppBar />
      <Outlet />
    </Box>
  );
}