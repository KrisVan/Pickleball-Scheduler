import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './context/UserProvider';

// Customize app styling theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    // primary: {
    //   main: '#00ff00'
    // }
  },
});

// Render App
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <StrictMode>
    <UserProvider>
      <ThemeProvider theme={theme} >
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </UserProvider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


