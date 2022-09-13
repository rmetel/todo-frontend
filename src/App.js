import React from 'react';
import './App.css';
import {
    Alert,
    Button,
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
        let apiEndpoint = "/tasks";

        this.apiUrl = isLocal? localHost + apiEndpoint : apiEndpoint;
        this.getAll = this.getAll.bind(this);
        this.add = this.add.bind(this);
        this.state = {tasks: []};

    }

    componentDidMount() {
        this.getAll();
    }

    getAll() {
        fetch(this.apiUrl + "/all")
            .then(response => response.json())
            .then(data => this.setState({tasks: data}));
    }

    add() {
        const getAll = this.getAll;

        let alertBox = document.querySelector("[role=alert]");

        let params = {
            description: document.getElementById(`description`).value
        };

        axios.post(this.apiUrl + "/add", params)
            .then(function (response) {
                if(response.status === 200) {
                    alertBox.innerHTML = `Task wurde erstellt!`;
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
                                />
                                <Button variant="outline-secondary" id="button-add" onClick={this.add}>
                                    Add
                                </Button>
                            </InputGroup>

                            <ListGroup as="ol" numbered>
                                {tasks.map(task =>
                                    <ListGroup.Item key={task.id}>{task.description}</ListGroup.Item>
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
