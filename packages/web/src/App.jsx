import React from 'react';
import { Routes, Route } from 'react-router-dom'

// Page imports
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import NoPage from './pages/NoPage';
import User from './pages/User';
// Component imports
import AppBar from './components/AppBar/AppBar';

const App = () => (
  <div className="App">
      <AppBar />
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/home" element = {<Home />} />
        <Route path="/about" element = {<About />} />
        <Route path="/login" element = {<Login />} />
        <Route path="/register" element = {<Register />} />
        <Route path="/user/:username" element = {<User />} />
        <Route path="*" element = {<NoPage />} />
      </Routes>
  </div>
);

export default App;