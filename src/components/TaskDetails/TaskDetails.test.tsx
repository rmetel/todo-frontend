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

const onChangeHandler = jest.fn();
const onSaveHandler = jest.fn();

describe('<TaskDetails />', () => {
    it('should render task description, given a task', () => {
        render(
            <TaskDetails
                task={task}
                onChangeHandler={onChangeHandler}
                onSaveHandler={onSaveHandler}
            />
        );
        expect(screen.getByRole("textbox")).toHaveValue("task");
    });

    it('should click save button', () => {
        render(
            <TaskDetails
                task={task}
                onChangeHandler={onChangeHandler}
                onSaveHandler={onSaveHandler}
            />
        );

        const saveButton = screen.getByRole("button", { name: "Save" });
        expect(saveButton).toBeInTheDocument();

        fireEvent.click(saveButton);
        expect(onSaveHandler).toBeCalled();
    });
});