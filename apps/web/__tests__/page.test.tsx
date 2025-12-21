import React from 'react';
import { render } from '@testing-library/react';
import Page from '../app/page';

describe('Home page (smoke)', () => {
  it('renders without crashing', () => {
    const { container } = render(<Page />);
    expect(container).toBeTruthy();
  });
});
