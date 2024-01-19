import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Box from '@mui/system/Box';
// Page imports
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';
import NoPage from './pages/NoPage';
import Register from './pages/Register';
import Scheduler from './pages/Scheduler';
import User from './pages/User';
// Component imports
import AppBar from './components/AppBar/AppBar';

const App = () => (
  <Box>
      <AppBar />
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/home" element = {<Home />} />
        <Route path="/dashboard" element = {<Home />} />
        <Route path="/scheduler" element = {<Scheduler />} />
        <Route path="/about" element = {<About />} />
        <Route path="/login" element = {<Login />} />
        <Route path="/register" element = {<Register />} />
        <Route path="/user/:username" element = {<User />} />
        <Route path="*" element = {<NoPage />} />
      </Routes>
  </Box>
);

export default App;