import React, { useEffect, useState } from 'react';
import {NavLink, useParams} from "react-router-dom";
import { Container } from "react-bootstrap";

function TaskDetails() {
    const {taskId}: any = useParams();
    return (
        <TaskView taskId={taskId}/>
    );
}

interface TaskViewProps {
    taskId: number;
}

const TaskView: React.FC<TaskViewProps> = ({ taskId }) => {
    const [task, setTask] = useState({id: "", description: ""});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch(getApiUrl() + "/tasks/" + taskId)
            .then(response => response.json())
            .then((task) => {
                setIsLoaded(true);
                setTask(task);
            });
    }, [taskId])

    const getApiUrl = () => {
        let isLocal = window.location.href.indexOf("localhost") > -1;
        let localHost = "http://localhost:5000";
        let apiEndpoint = "/api";
        return isLocal ? localHost + apiEndpoint : apiEndpoint;
    }

    return isLoaded ?
    (
        <Container className="mt-5">
            <div className="row d-flex justify-content-center">
                <div className="col-md-10 mb-3">
                    <NavLink to="/" className="text-dark">
                    <i className="bi-arrow-left"></i>&nbsp;Zurück</NavLink>
                </div>
                <div className="col-md-10">
                    <div className="card mb-4">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="product p-4">
                                    <h5 className="text-uppercase">{task.id}. {task.description}</h5>
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