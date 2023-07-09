import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { TaskDetails } from "./TaskDetails";
import { Task } from "../../models/Task";

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
        render(
            <TaskDetails
                task={task}
                onChange={onChange}
                onSave={onSave}
            />
        );
        expect(screen.getByRole("textbox")).toHaveValue("task");
    });

    it('should click save button', () => {
        render(
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
});