import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { TaskView } from './TaskDetails';

describe('App', () => {
  it('renders TaskView component', () => {
    render(<TaskView apiUrl='/' taskId={1} />);
    expect(screen.getByText("Lädt...")).toBeInTheDocument();
  });
});