import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import GuessNumber from './GuessNumber';

test("check the messages of user's guess", async () => {
  render(<GuessNumber />);

  fireEvent.change(screen.getByLabelText(/enter a guess/i), {
    target: { value: 5 },
  });

  const button = screen.getByText(/guess it/i);
  const message = await screen.findByRole('message');

  // first click by user
  fireEvent.click(button);
  expect(message).toHaveTextContent(/your first guess is/i);

  // second click by user
  fireEvent.click(button);
  expect(message).toHaveTextContent(/your second guess is/i);

  // third click by user
  fireEvent.click(button);
  expect(message).toHaveTextContent(/your last guess is/i);
  expect(button).toBeDisabled();
});
