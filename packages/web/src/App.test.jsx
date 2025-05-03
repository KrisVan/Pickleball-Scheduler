import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

// Set environment for unit tests
vi.mock('./components/EventCalendar/EventCalendar', () => ({
  PickleballCalendar: () => <div data-testid="pickleball-calendar" />,
}));

test('Is App Bar Rendered', () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  const text = screen.getAllByText('PickLeTime');
  expect(text[0]).toBeInTheDocument();
});

// test('Is Home Rendered', () => {
//   render(<MemoryRouter><App /></MemoryRouter>);
//   const text = screen.getByText('Home');
//   expect(text).toBeInTheDocument();
// });
