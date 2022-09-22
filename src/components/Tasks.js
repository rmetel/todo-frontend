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
        this.getAll = this.getAll.bind(this);

        this.state = {tasks: []};
    }

    componentDidMount() {
        this.getAll();
        this.inputField = document.getElementById(`description`);
    }

    getAll() {
        fetch(this.apiUrl + "/tasks")
            .then(response => response.json())
            .then(data => this.setState({tasks: data}));
    }

    addTask() {
        const getAll = this.getAll;
        const inputField = this.inputField;

        let params = {
            description: inputField.value
        };

        axios.post(this.apiUrl + "/tasks/add", params)
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
            .catch(function (error) {
                console.log(error);
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

    onKeyEnterSubmit(e) {
        if (e.code === "Enter") {
            this.addTask();
        }
    }

    render() {
        const {tasks} = this.state;
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

                            <ListGroup>
                                {tasks.map((task, index) =>
                                    <ListGroup.Item key={task.id}>
                                        <Row>
                                            <Col className={"col-10 col-lg-10"}>
                                                {index + 1}. {task.description}
                                            </Col>
                                            <Col xs={2} className={"text-right"}>
                                                <Link to={`/tasks/${task.id}`}><i className="bi-pencil mr-4"></i></Link>
                                                <CloseButton className={"deleteTask"} onClick={() => {
                                                    this.deleteTask(task)
                                                }}/>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default Tasks;