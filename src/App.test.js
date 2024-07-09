import { render, screen } from '@testing-library/react';
import App from './App';
import MainApp from './App';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import { createRoot } from 'react-dom/client';

test('renders without crg', () => {
    // render( <App /> );
    // const linkElement = screen.getByText(/learn react/i);
    // expect(linkElement).toBeInTheDocument();

});

test('renders without crashing', () => {
    const div = document.createElement('div');
    render(<MainApp />);
    unmountComponentAtNode(div)
});