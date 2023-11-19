import React from 'react';
import { Header } from './components/Header/Header';
import { PickleballCalendar } from './components/PickleballCalendar/PickleballCalendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css';

const App = () => (
  <div className="App">
    <Header />
    <PickleballCalendar />
  </div>
);

export default App;


