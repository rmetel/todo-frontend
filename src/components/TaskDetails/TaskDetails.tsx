import React, { ChangeEvent, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Task } from "~/models/Task";
import { Button, Form } from "react-bootstrap";

interface TaskDetailsProps {
  task: Task;
  saveTask: (task: Task) => void;
}

export const TaskDetails: React.FC<TaskDetailsProps> = ({ task, saveTask }) => {
  const [taskDescription, setTaskDescription] = useState<string>(
    task.description,
  );
  const [taskDone, setTaskDone] = useState<boolean>(task.done);
  const [isChanged, setIsChanged] = useState<boolean>(false);

  const handleChangeTaskDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskDescription(e.target.value);
  };

  const handleChangeTaskDone = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskDone(e.target.checked);
  };

  useEffect(() => {
    if (taskDescription === task.description && taskDone === task.done) {
      setIsChanged(false);
    } else {
      setIsChanged(true);
    }
  }, [taskDescription, taskDone, task]);

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    saveTask({
      ...task,
      description: taskDescription,
      done: taskDone,
    });
  };

  return (
    <>
      <div className="col-md-10 mb-3">
        <NavLink to="/" className="text-dark">
          <i className="bi-arrow-left"></i>&nbsp;Zurück
        </NavLink>
      </div>
      <div className="col-md-10">
        <div className="card mb-10">
          <div className="row">
            <div className="col-md-12">
              <div className="product p-4">
                <h2>
                  {taskDescription} ist{" "}
                  {taskDone ? "erledigt :)" : " nicht erledigt."}
                </h2>
                <Form>
                  <div className="form-group mb-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter task name"
                      value={taskDescription}
                      onChange={handleChangeTaskDescription}
                      style={{
                        border: "none",
                        borderBottom: "1px solid #aeaeae",
                        borderRadius: 0,
                        paddingLeft: 0,
                      }}
                    />
                  </div>
                  <Form.Check
                    type={"checkbox"}
                    checked={taskDone}
                    onChange={handleChangeTaskDone}
                    id={"checkbox"}
                    style={{ margin: "0 5px 10px 0" }}
                    label={"Erledigt"}
                  />
                  <div style={{ textAlign: "center" }}>
                    <Button
                      variant={isChanged ? "primary" : "outline-secondary"}
                      onClick={handleSave}
                      disabled={!isChanged}
                    >
                      Save
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
