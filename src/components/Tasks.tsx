import React, { ChangeEvent, KeyboardEvent, useState, useEffect } from "react";
import { Button, CloseButton, Col, Container, Form, InputGroup, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import iziToast from "izitoast";
import { Task } from '../models/Task';

interface TasksProps {
    apiUrl: string;
}

const Tasks: React.FC<TasksProps> = ({ apiUrl }) => {
    const [isLoaded, setLoaded] = useState(false);
    const [isError, setIsError] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        getTasks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getTasks = () => {
        fetch(apiUrl + "/tasks")
            .then(response => response.json())
            .then((tasks) => {
                setLoaded(true);
                setTasks(tasks);
            })
            .catch(error => {
                setIsError(true);
                setLoaded(false);

                iziToast.show({
                    theme: 'dark',
                    icon: 'icon-person',
                    title: `${error.message}`,
                    position: 'bottomCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
                    progressBarColor: 'rgb(241,81,86)',
                    timeout: 3000
                });
            });
    }

    const addTask = (taskName: string) => {
        if(taskName === ""){
            return;
        }

        axios.post(apiUrl + "/tasks", { description: taskName })
            .then(function (response) {
                iziToast.show({
                    theme: 'dark',
                    icon: 'icon-person',
                    title: `Task "${taskName}" wurde erstellt!`,
                    position: 'bottomCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
                    progressBarColor: 'rgb(0, 255, 184)',
                    timeout: 3000
                });

                setTaskName("");
                getTasks();
            })
            .catch(function (error) {
                setIsError(true);
                showError(error);
            });
    }

    const deleteTask = (task: Task) => {
        axios.delete(apiUrl + "/tasks/" + task.id)
            .then(function (response) {
                iziToast.show({
                    theme: 'dark',
                    icon: 'icon-person',
                    title: `Task "${task.description}" wurde gelöscht!`,
                    position: 'bottomCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
                    progressBarColor: 'rgb(241,81,86)',
                    timeout: 3000
                });

                getTasks();
            })
            .catch(function (error) {
                setIsError(true);
                showError(error);
            });
    }

    const updateTaskStatus = (task: Task) => {
        let params = {
            id: task.id,
            description: task.description,
            done: !task.done
        };

        axios.put(apiUrl + "/tasks/" + task.id, params)
            .then(function (response) {
                if (response.status === 200) {
                    iziToast.show({
                        theme: 'dark',
                        icon: 'icon-person',
                        title: `Task "${task.description}" wurde aktualisiert!`,
                        position: 'bottomCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
                        progressBarColor: 'rgb(0, 255, 184)',
                        timeout: 3000
                    });

                    getTasks();
                }
            })
            .catch(function (error) {
                setIsError(true);
                showError(error);
            });

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.target.value);
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            addTask(taskName);
        }
    }

    const showError = (error: AxiosError) => {
        iziToast.show({
            theme: 'dark',
            icon: 'icon-person',
            title: `${error.name}: ${error.message}`,
            position: 'bottomCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
            progressBarColor: 'rgb(241,81,86)',
            timeout: 5000
        });
    }

    return (
        <Container className="mt-4">
            <Row>
                <Col className={"col-lg-8 offset-lg-2"}>
                    <div className={"text-center mb-4"}>
                        <h1>ToDo List</h1>
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
                        <Button variant="outline-secondary" id="button-add" onClick={() => {addTask(taskName)}}>Add</Button>
                    </InputGroup>

                    {isLoaded ?
                        <ListGroup>
                            {tasks.map((task, index) =>
                                <ListGroup.Item key={task.id} className={task.done ? "resolved" : ""}>
                                    <Row>
                                        <Col xs={9} lg={10}>
                                          <span onClick={() => {updateTaskStatus(task)}}>
                                              {task.done ? <i className="bi-check-circle mr-2"/> : <i className="bi-circle mr-2"/>}
                                          </span>
                                          {index + 1}. {task.description}
                                        </Col>
                                        <Col xs={3} lg={2} className={"text-right"}>
                                            <Link to={`/tasks/${task.id}`}><i className="bi-pencil mr-4"></i></Link>
                                            <CloseButton className={"deleteTask"} onClick={() => {
                                                deleteTask(task)
                                            }}/>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    :
                        <div>
                            <div className="d-flex justify-content-center">
                                {isError ? "Fehler beim Verbinden..." : "Lädt Daten..."}
                            </div>
                            <div className="d-flex justify-content-center">
                                {isError ? <i className={"bi-cloud-slash"} style={{fontSize: 32}}></i> : <i className={"bi-cloud-arrow-down"} style={{fontSize: 32}}></i>}
                            </div>
                        </div>
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default Tasks;
