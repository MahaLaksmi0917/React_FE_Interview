import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('calls onClick prop on button click', () => {
  const onClick = jest.fn(); // mock function
  render(<Button text="Submit" onClick={onClick} />);
  
  const button = screen.getByText('Submit');
  fireEvent.click(button);

  expect(onClick).toHaveBeenCalled(); // assert it was called
});
