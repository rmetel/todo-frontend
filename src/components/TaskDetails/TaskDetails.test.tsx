import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { TaskDetails } from "components";
import { Task } from "../../models/Task";
import { renderWithProviders } from "helpers";

const task: Task = {
  id: "1",
  done: false,
  description: "task"
}

jest.spyOn(console, "error").mockImplementation(() => {
});

const onChange = jest.fn();
const onSave = jest.fn();

describe('<TaskDetails />', () => {
  it('should render task description, given a task', () => {
    renderWithProviders(
      <TaskDetails
        task={task}
        onChange={onChange}
        onSave={onSave}
      />
    );
    expect(screen.getByRole("textbox")).toHaveValue("task");
  });

  it('should click save button', () => {
    renderWithProviders(
      <TaskDetails
        task={task}
        onChange={onChange}
        onSave={onSave}
      />
    );

    const saveButton = screen.getByRole("button", { name: "Save" });
    expect(saveButton).toBeInTheDocument();

    fireEvent.click(saveButton);
    expect(onSave).toBeCalled();
  });

  it('should click back button', () => {
    renderWithProviders(
      <TaskDetails
        task={task}
        onChange={onChange}
        onSave={onSave}
      />
    );

    const saveButton = screen.getByRole("link", { name: "Zurück" });
    expect(saveButton).toBeInTheDocument();

    fireEvent.click(saveButton);
    expect(window.location.pathname).toBe("/");
  });
});