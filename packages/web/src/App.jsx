import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Routes, Route } from 'react-router-dom'

// Page imports
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import NoPage from './pages/NoPage';
import User from './pages/User';

// Component imports
import Navbar from './components/NavBar/NavBar';
import { Header } from './components/Header/Header';
import { PickleballCalendar } from './components/PickleballCalendar/PickleballCalendar';
// Local imports
import './App.css';

const queryClient = new QueryClient();

const App = () => (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Navbar/>
          <Routes>
            <Route path="/" element = {<Home />} />
            <Route path="/home" element = {<Home />} />
            <Route path="/about" element = {<About />} />
            <Route path="/login" element = {<Login />} />
            <Route path="/register" element = {<Register />} />
            <Route path="/user/:username" element = {<User />} />
            <Route path="*" element = {<NoPage />} />
          </Routes>
      </QueryClientProvider>
    </div>
);

export default App;