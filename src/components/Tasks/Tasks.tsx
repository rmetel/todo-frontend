import React, { KeyboardEvent, useEffect, useState } from "react";
import {
  Button,
  CloseButton,
  Col,
  Form,
  InputGroup,
  ListGroup,
  Row
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { Task } from "~/models/Task";
import { getApiUrl, toastSettings } from "~/helpers";
import { immediateToast } from "izitoast-react";

export const Tasks: React.FC = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const apiUrl = getApiUrl();

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTasks = () => {
    fetch(apiUrl + "/tasks")
      .then((response) => response.json())
      .then((tasks) => {
        setLoaded(true);
        setTasks(tasks);
      })
      .catch((error) => {
        setIsError(true);
        setLoaded(false);
        immediateToast("info", {
          ...toastSettings,
          progressBarColor: "rgb(241,81,86)",
          title: error.message
        });
      });
  };

  const addTask = (taskName: string) => {
    if (taskName === "") {
      return;
    }

    axios
      .post(apiUrl + "/tasks", { description: taskName })
      .then((response) => {
        if (response.status === 200) {
          immediateToast("info", {
            ...toastSettings,
            title: `Task "${taskName}" wurde erstellt!`
          });
          setTaskName("");
          getTasks();
        }
      })
      .catch((error) => {
        setIsError(true);
        immediateToast("info", {
          ...toastSettings,
          progressBarColor: "rgb(241,81,86)",
          title: error.message
        });
      });
  };

  const deleteTask = (task: Task) => {
    axios
      .delete(apiUrl + "/tasks/" + task.id)
      .then((response) => {
        if (response.status === 200) {
          immediateToast("info", {
            ...toastSettings,
            progressBarColor: "rgb(241,81,86)",
            title: `Task "${task.description}" wurde gelöscht!`
          });
        }
        getTasks();
      })
      .catch((error) => {
        setIsError(true);
        immediateToast("info", {
          ...toastSettings,
          progressBarColor: "rgb(241,81,86)",
          title: error.message
        });
      });
  };

  const updateTaskStatus = (task: Task) => {
    const params = {
      id: task.id,
      description: task.description,
      done: !task.done
    };

    axios
      .put(apiUrl + "/tasks/" + task.id, params)
      .then((response) => {
        if (response.status === 200) {
          immediateToast("info", {
            ...toastSettings,
            title: `Task "${task.description}" wurde aktualisiert!`
          });
          getTasks();
        }
      })
      .catch((error) => {
        setIsError(true);
        immediateToast("info", {
          ...toastSettings,
          progressBarColor: "rgb(241,81,86)",
          title: error.message
        });
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setTaskName(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      addTask(taskName);
    }
  };

  return (
    <>
      <div className={"text-center mb-4"}>
        <h3>Todo-App</h3>
      </div>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="New task"
          aria-label="ToDo"
          aria-describedby="New task"
          value={taskName}
          onChange={(e) => handleChange(e as any)}
          onKeyDown={handleKeyDown}
        />
        <Button
          variant="outline-secondary"
          id="button-add"
          onClick={() => {
            addTask(taskName);
          }}
        >
          Add
        </Button>
      </InputGroup>

      {isLoaded ? (
        <ListGroup>
          {tasks.map((task, index) => (
            <ListGroup.Item
              key={task.id}
              className={task.done ? "resolved" : ""}
            >
              <Row>
                <Col
                  xs={9}
                  lg={10}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    updateTaskStatus(task);
                  }}
                >
                  <span>
                    {task.done ? (
                      <i className="bi-check-circle mr-2" />
                    ) : (
                      <i className="bi-circle mr-2" />
                    )}
                  </span>
                  {index + 1}. {task.description}
                </Col>
                <Col xs={3} lg={2} className={"text-right"}>
                  <Link to={`/tasks/${task.id}`}>
                    <i className="bi-pencil mr-4"></i>
                  </Link>
                  <CloseButton
                    className={"deleteTask"}
                    onClick={() => {
                      deleteTask(task);
                    }}
                  />
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <div>
          <div className="d-flex justify-content-center">
            {isError ? "Fehler beim Verbinden..." : "Lädt Daten..."}
          </div>
          <div className="d-flex justify-content-center">
            {isError ? (
              <i className={"bi-cloud-slash"} style={{ fontSize: 32 }}></i>
            ) : (
              <i className={"bi-cloud-arrow-down"} style={{ fontSize: 32 }}></i>
            )}
          </div>
        </div>
      )}
    </>
  );
};
