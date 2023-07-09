import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import axios, { AxiosError } from "axios";
import iziToast from "izitoast";
import { Task } from '../../models/Task';
import { TaskDetails } from "../../components/TaskDetails/TaskDetails";

interface TaskViewProps {
    apiUrl: string;
}

export const TaskView: React.FC<TaskViewProps> = ({ apiUrl }) => {
    const { taskId } = useParams();
    const [task, setTask] = useState({ id: "", description: "", done: false });
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask({ ...task, description: e.target.value });
    }

    const onSave: React.MouseEventHandler<HTMLButtonElement> = (e: React.MouseEvent<HTMLButtonElement>) => {
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

    return (
        <Container className="mt-5">
            <div className="row d-flex justify-content-center">
                {isLoaded ?
                    <TaskDetails
                        task={task}
                        onChange={onChange}
                        onSave={onSave}
                    />
                    :
                    <div className="col-md-10 mb-3">
                        Lädt...
                    </div>
                }
            </div>
        </Container>
    );
}
