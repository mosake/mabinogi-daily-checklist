import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('updates checklist progress when tasks are completed and reset', () => {
  render(<App />);

  const progressBar = screen.getByRole('progressbar', { name: /tasks completed/i });
  const task = screen.getByRole('checkbox', {
    name: /keep your fynni blossoming cages running/i,
  });

  expect(progressBar).toHaveAttribute('aria-valuenow', '0');
  fireEvent.click(task);
  expect(progressBar).toHaveAttribute('aria-valuenow', '1');

  fireEvent.click(screen.getByRole('button', { name: /reset/i }));
  expect(progressBar).toHaveAttribute('aria-valuenow', '0');
  expect(task).not.toBeChecked();
});
