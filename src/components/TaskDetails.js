import React from "react";
import {NavLink, useParams} from "react-router-dom";

import {
    Container,
} from "react-bootstrap";

function TaskDetails() {
    const {taskId} = useParams();
    return (
        <TaskView taskId={taskId}/>
    );
}

class TaskView extends React.Component {
    constructor(props) {
        super(props);
        this.apiUrl = this.getApiUrl();
        this.taskId = this.props.taskId;
        this.state = {task: [], isLoaded: false};
    }

    componentDidMount() {
        fetch(this.apiUrl + "/tasks/" + this.taskId)
            .then(response => response.json())
            .then(data => this.setState({task: data, isLoaded: true}));
    }

    getApiUrl() {
        let isLocal = window.location.href.indexOf("localhost") > -1;
        let localHost = "http://localhost:5000";
        let apiEndpoint = "/api";
        return isLocal ? localHost + apiEndpoint : apiEndpoint;
    }

    render() {
        const {task, isLoaded} = this.state;

        if (!isLoaded) {
            return (
                <>
                    <Container className="mt-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-10 mb-3">
                                Lädt...
                            </div>
                        </div>
                    </Container>
                </>
            )
        } else {
            return (
                <>
                    <Container className="mt-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-10 mb-3">
                                <NavLink to="/" className="text-dark"><i
                                    className="bi-arrow-left"></i>&nbsp;Zurück</NavLink>
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
                </>
            );
        }
    }
}

export default TaskDetails;