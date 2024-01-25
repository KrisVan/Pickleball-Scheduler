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
// Component imports
import Layout from './components/Layout.jsx/Layout.jsx';

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
      {/* Protected Authorized routes */}
      <Route path="/admin" element = {<Admin />}>
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