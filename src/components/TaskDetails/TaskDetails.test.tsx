import { vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { TaskDetails } from "~/components";
import { Task } from "~/models/Task";
import { renderWithProviders } from "~/helpers";

const task: Task = {
  id: "1",
  done: false,
  description: "task",
};

const mockSaveTask = vi.fn();

describe("<TaskDetails />", () => {
  it("should render task description, given a task", () => {
    renderWithProviders(<TaskDetails task={task} saveTask={mockSaveTask} />);
    expect(screen.getByRole("textbox")).toHaveValue("task");
  });

  it("should mark item as done and save", () => {
    renderWithProviders(<TaskDetails task={task} saveTask={mockSaveTask} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    const saveButton = screen.getByRole("button", { name: "Save" });
    expect(saveButton).toBeDisabled();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(saveButton).toBeEnabled();

    fireEvent.click(saveButton);
    expect(mockSaveTask).toBeCalled();
  });

  it("should click back button", () => {
    renderWithProviders(<TaskDetails task={task} saveTask={mockSaveTask} />);

    const saveButton = screen.getByRole("link", { name: "Zurück" });
    expect(saveButton).toBeInTheDocument();

    fireEvent.click(saveButton);
    expect(window.location.pathname).toBe("/");
  });
});
