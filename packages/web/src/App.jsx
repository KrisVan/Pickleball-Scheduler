import React from 'react';
import { Routes, Route } from 'react-router-dom'
// Page imports
import About from './pages/About';
import Admin from './pages/Admin.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import NoPage from './pages/NoPage';
import Register from './pages/Register';
import Scheduler from './pages/Scheduler';
import User from './pages/User';
import Unauthorized from './pages/Unauthorized.jsx';
// Component imports
import Layout from './components/Layout.jsx/Layout.jsx';
import RequireAuth from './components/RequireAuth.jsx/RequireAuth.jsx';

const App = () => (
  <Routes>
    <Route path ="/" element={<Layout />}>
      {/* Public routes */}
      <Route index element = {<Home />} />
      <Route path="/home" element = {<Home />} />
      <Route path="/dashboard" element = {<Home />} />
      <Route path="/scheduler" element = {<Scheduler />} />
      <Route path="/about" element = {<About />} />
      <Route path="/login" element = {<Login />} />
      <Route path="/register" element = {<Register />} />
      <Route path="/unauthorized" element = {<Unauthorized />} />
      {/* Protected Admin routes */}
      <Route path="/admin" element = {<RequireAuth allowedRole="ADMIN"/>}>
        <Route index element = {<Admin />} />
        <Route path="/admin/dashboard" element = {<Admin />} />
      </Route>
      {/* Authenticated routes */}
      <Route path="/user/:username" element = {<User />} />
      {/* Catch All */}
      <Route path="*" element = {<NoPage />} />
    </Route>
  </Routes>

);

export default App;