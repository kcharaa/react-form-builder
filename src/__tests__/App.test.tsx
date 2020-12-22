import * as React from 'react';
import { render, cleanup } from '@testing-library/react';

import App from '../components/App';

afterEach(cleanup);

test('renders the correct content', () => {
    const { getByText } = render(<App />); 

    expect(getByText('Step 1/2')).not.toBeNull;
    expect(getByText('Next')).not.toBeNull;
});

test('renders the form', () => {
    const { container } = render(<App />);

    expect(container.querySelector('form-container')).not.toBeNull();
})