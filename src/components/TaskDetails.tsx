import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import axios, { AxiosError } from "axios";
import iziToast from "izitoast";
import { Task } from '../models/Task';

interface TaskDetailsProps {
    apiUrl: string;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ apiUrl }) => {
    const { taskId }: any = useParams();
    return (
        <TaskView apiUrl={apiUrl} taskId={taskId}/>
    );
}

interface TaskViewProps {
    apiUrl: string;
    taskId: number;
}

export const TaskView: React.FC<TaskViewProps> = ({ apiUrl, taskId }) => {
    const [task, setTask] = useState({id: "", description: "", done: false});
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);

    const onChangeHandler = (e: any) => {
        setTask({...task, description: e.target.value});
    }

    const saveChanges: React.MouseEventHandler<HTMLButtonElement> = (e: any) => {
        e.preventDefault();
        updateTask(task);
    }

    const updateTask = (task: Task) => {
        let params = {
            id: task.id,
            description: task.description,
            done: task.done
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
                }
            })
            .catch(function (error) {
                setIsError(true);
                showError(error);
            });

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

    useEffect(() => {
        fetch(apiUrl + "/tasks/" + taskId)
            .then(response => response.json())
            .then((task) => {
                setIsLoaded(true);
                setTask(task);
            });
    }, [apiUrl, taskId])

    return isLoaded ?
    (
        <Container className="mt-5">
            <div className="row d-flex justify-content-center">
                <div className="col-md-8 mb-3">
                    <NavLink to="/" className="text-dark">
                    <i className="bi-arrow-left"></i>&nbsp;Zurück</NavLink>
                </div>
                <div className="col-md-8">
                    <div className="card mb-10">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="product p-4">
                                    <form>
                                      <div className="form-group mb-4">
                                        <input  type="text"
                                                className="form-control"
                                                placeholder="Enter task name"
                                                value={task.description}
                                                onChange={onChangeHandler}
                                        />
                                      </div>
                                      <button type="submit" className="btn btn-primary" onClick={saveChanges}>Save</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    ) :
    (
        <Container className="mt-5">
            <div className="row d-flex justify-content-center">
                <div className="col-md-10 mb-3">
                    Lädt...
                </div>
            </div>
        </Container>
    );
}

export default TaskDetails;
