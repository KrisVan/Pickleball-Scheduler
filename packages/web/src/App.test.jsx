import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import App from './App';

// Set environment for unit tests
jest.mock('./components/PickleballCalendar/PickleballCalendar', () => ({
  PickleballCalendar: () => <div data-testid="pickleball-calendar" />
}));

test('Is Navbar Rendered', () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  const text = screen.getByText('Navbar');
  expect(text).toBeInTheDocument();
});

test('Is Home Rendered', () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  const text = screen.getByText('Pickleball Scheduler');
  expect(text).toBeInTheDocument();
});