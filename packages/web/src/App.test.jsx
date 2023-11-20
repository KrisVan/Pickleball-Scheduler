import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./components/PickleballCalendar/PickleballCalendar', () => ({
  PickleballCalendar: () => <div data-testid="pickleball-calendar" />
}));

test('renders title', () => {
  render(<App />);
  const calendar = screen.getByTestId('pickleball-calendar');
  expect(calendar).toBeTruthy();
});
