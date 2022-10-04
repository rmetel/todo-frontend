import React from "react";

import {Button, CloseButton, Col, Container, Form, InputGroup, ListGroup, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import iziToast from "izitoast";

class Tasks extends React.Component {
    constructor(props) {
        super(props);

        this.apiUrl = this.props.getApiUrl();
        this.addTask = this.addTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.getAll = this.getAll.bind(this);

        this.state = {tasks: [], isLoaded: false, error: null};
    }

    componentDidMount() {
        this.inputField = document.getElementById(`description`);
        this.getAll();
    }

    getAll() {
        fetch(this.apiUrl + "/tasks")
            .then(response => response.json())
            .then(data => this.setState({tasks: data, isLoaded: true}))
            .catch(error => {
                this.setState({error: error});
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

    addTask() {
        const getAll = this.getAll;
        const inputField = this.inputField;

        let params = {
            description: inputField.value
        };

        axios.post(this.apiUrl + "/tasks", params)
            .then(function (response) {
                if (response.status === 200) {
                    iziToast.show({
                        theme: 'dark',
                        icon: 'icon-person',
                        title: `Task "${inputField.value}" wurde erstellt!`,
                        position: 'bottomCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
                        progressBarColor: 'rgb(0, 255, 184)',
                        timeout: 3000
                    });

                    inputField.value = "";
                    getAll();
                }
            })
            .catch(function (e) {
                iziToast.show({
                    theme: 'dark',
                    icon: 'icon-person',
                    title: `${e.name}: ${e.message}`,
                    position: 'bottomCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
                    progressBarColor: 'rgb(241,81,86)',
                    timeout: 5000
                });
            });
    }

    deleteTask(task) {
        const getAll = this.getAll;

        axios.delete(this.apiUrl + "/tasks/" + task.id)
            .then(function (response) {
                if (response.status === 200) {
                    iziToast.show({
                        theme: 'dark',
                        icon: 'icon-person',
                        title: `Task "${task.description}" wurde gelöscht!`,
                        position: 'bottomCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
                        progressBarColor: 'rgb(241,81,86)',
                        timeout: 3000
                    });

                    getAll();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    updateTask(task) {
        let params = {
            id: task.id,
            description: task.description,
            done: !task.done
        };

        axios.put(this.apiUrl + "/tasks/" + task.id, params)
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
            .catch(function (e) {
                iziToast.show({
                    theme: 'dark',
                    icon: 'icon-person',
                    title: `${e.name}: ${e.message}`,
                    position: 'bottomCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
                    progressBarColor: 'rgb(241,81,86)',
                    timeout: 5000
                });
            });

    }

    onKeyEnterSubmit(e) {
        if (e.code === "Enter") {
            this.addTask();
        }
    }

    render() {
        const {tasks, isLoaded, error} = this.state;
        let content;
        const stylesObj = {
            fontSize: '32px',
        };
        if (isLoaded) {
            content =
                <ListGroup>
                    {tasks.map((task, index) =>
                        <ListGroup.Item key={task.id}>
                            <Row>
                                <Col xs={9} lg={10}>
                                    <span onClick={() => {this.updateTask(task)}}>
                                        {task.done ? <i className="bi-check-circle mr-2"/> : <i className="bi-circle mr-2"/>}
                                    </span>
                                    {index + 1}. {task.description}
                                </Col>
                                <Col xs={3} lg={2} className={"text-right"}>
                                    <Link to={`/tasks/${task.id}`}><i className="bi-pencil mr-4"></i></Link>
                                    <CloseButton className={"deleteTask"} onClick={() => {
                                        this.deleteTask(task)
                                    }}/>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )}
                </ListGroup>
        } else {
            content =
                <div>
                    <div className="d-flex justify-content-center">
                        {error ? "Fehler beim Verbinden..." : "Lädt Daten..."}
                    </div>
                    <div className="d-flex justify-content-center">
                        {error ? <i className={"bi-cloud-slash"} style={stylesObj}></i> : <i className={"bi-cloud-arrow-down"} style={stylesObj}></i>}
                    </div>
                </div>
        }

        return (
            <>
                <Container className="mt-4">
                    <Row>
                        <Col className={"col-lg-8 offset-lg-2"}>
                            <div className={"text-center mb-4"}>
                                <h1>ToDo List</h1>
                            </div>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    id={"description"}
                                    placeholder="New task"
                                    aria-label="ToDo"
                                    aria-describedby="new task"
                                    onKeyDown={this.onKeyEnterSubmit.bind(this)}
                                />
                                <Button variant="outline-secondary" id="button-add" onClick={this.addTask}>
                                    Add
                                </Button>
                            </InputGroup>

                            {content}
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default Tasks;