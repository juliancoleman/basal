import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Button } from '.';

describe('<Button />', () => {
  it('renders when no props are passed', () => {
    render(<Button />);
  });

  it('can have a label', () => {
    const { getByText } = render(<Button label="Click me" />);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('can have a ref', () => {
    const buttonRef = { current: null };

    render(<Button ref={buttonRef} />);

    expect(buttonRef.current).not.toBeNull();
  });
});
