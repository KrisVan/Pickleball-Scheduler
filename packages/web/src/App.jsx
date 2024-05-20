import { Routes, Route } from 'react-router-dom'
// Page imports
import About from './pages/About';
import Account from './pages/Account';
import Admin from './pages/Admin.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import NoPage from './pages/NoPage';
import Register from './pages/Register';
import Scheduler from './pages/Scheduler';
import Profile from './pages/Profile.jsx';
import Unauthorized from './pages/Unauthorized.jsx';
// Component imports
import Layout from './components/Layout/Layout.jsx';
import SignOut from './components/SignOut/SignOut.jsx';
import RequireAuth from './components/RequireAuth/RequireAuth.jsx';
import RequireUser from './components/RequireUser/RequireUser.jsx';
import PersistLogin from './components/PersistLogin/PersistLogin.jsx';

const App = () => (
  <Routes>
    <Route element={<PersistLogin />}>
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
        <Route path="/logout" element = {<SignOut />} />
        {/* Protected Admin routes */}
        <Route path="/admin" element = {<RequireAuth allowedRole="ADMIN"/>}>
          <Route index element = {<Admin />} />
          <Route path="/admin/dashboard" element = {<Admin />} />
        </Route>
        {/* User routes */}
        <Route path="/user/:username" element = {<Profile />} />
        <Route path="/user" element = {<RequireUser allowedRole="ADMIN"/>}>
          <Route index element = {<NoPage />} />
          <Route path="/user/:username/account" element = {<Account />} />
        </Route>
        {/* Catch All */}
        <Route path="*" element = {<NoPage />} />
      </Route>
    </Route>
  </Routes>

);

export default App;