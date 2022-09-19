import React from 'react';
import './App.css';
import {
    Alert,
    Button,
    CloseButton,
    Col,
    Container,
    Form,
    InputGroup,
    ListGroup,
    Row
} from "react-bootstrap";
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);

        let isLocal = window.location.href.indexOf("localhost") > -1;
        let localHost = "http://localhost:8080";
        let apiEndpoint = "/api";

        this.apiUrl = isLocal? localHost + apiEndpoint : apiEndpoint;
        this.getAll = this.getAll.bind(this);
        this.addTask = this.addTask.bind(this);
        this.state = {tasks: []};

    }

    componentDidMount() {
        this.getAll();
        this.inputField = document.getElementById(`description`);
    }

    onKeyEnterSubmit(e){
        if(e.code === "Enter") {
            this.addTask();
        }
    }

    getAll() {
        fetch(this.apiUrl + "/tasks")
            .then(response => response.json())
            .then(data => this.setState({tasks: data}));
    }

    addTask() {
        const getAll = this.getAll;
        const inputField = this.inputField;

        let alertBox = document.querySelector("[role=alert]");

        let params = {
            description: inputField.value
        };

        axios.post(this.apiUrl + "/tasks/add", params)
            .then(function (response) {
                if(response.status === 200) {
                    alertBox.innerHTML = `Task "${inputField.value}" wurde erstellt!`;
                    alertBox.classList.remove("d-none");
                    window.setTimeout(function() {
                        alertBox.classList.add("d-none");
                    }, 2000);

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

        let alertBox = document.querySelector("[role=alert]");

        axios.delete(this.apiUrl + "/tasks/" + task.id)
            .then(function (response) {
                if(response.status === 200) {
                    alertBox.innerHTML = `Task "${task.description}" wurde gelöscht!`;
                    alertBox.classList.remove("d-none");
                    window.setTimeout(function() {
                        alertBox.classList.add("d-none");
                    }, 2000);

                    getAll();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const {tasks} = this.state;
        return (
            <div className="App">
                <Alert variant="success" className="d-none"></Alert>
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
                                {tasks.map(task =>
                                    <ListGroup.Item key={task.id}>
                                        <Row>
                                            <Col className={"col-10 col-lg-10"}>
                                                {task.id}. {task.description}
                                            </Col>
                                            <Col xs={2} lg={2} className={"text-right"}>
                                                <CloseButton className={"deleteTask"} onClick={() => { this.deleteTask(task) }} />
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>

                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
