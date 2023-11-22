import { render, screen } from '@testing-library/react';
import App from './App';

// Test if the title is rendered
test('renders title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Pickleball Scheduler/i);
    expect(titleElement).toBeInTheDocument();
});

// Test if the title is rendered on screen
test('renders title', () => {
    render(<App />);
    const linkElement = screen.getByText('Pickleball Scheduler');
    expect(linkElement).toBeInTheDocument();
});