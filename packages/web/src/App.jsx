import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Header } from './components/Header/Header';
import { PickleballCalendar } from './components/PickleballCalendar/PickleballCalendar';
import './App.css';

const queryClient = new QueryClient();

const App = () => (
  <div className="App">
    <QueryClientProvider client={queryClient}>
      <Header />
      <PickleballCalendar />
    </QueryClientProvider>
  </div>
);

export default App;
