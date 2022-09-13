import React, { useState } from 'react';
import './App.css';
import {
    Button,
    Col,
    Container,
    Form,
    InputGroup,
    ListGroup,
    Row
} from "react-bootstrap";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.getTasks = this.getTasks.bind(this);
        this.state = {tasks: []};
    }

    componentDidMount() {
        this.getTasks();
    }

    getTasks() {
        let isLocal = window.location.href.indexOf("localhost") > -1;
        let urlLocal = "http://localhost:8080";
        let endPoint = "/tasks/all";

        fetch(isLocal? urlLocal + endPoint : endPoint)
            .then(response => response.json())
            .then(data => this.setState({tasks: data}));
    }

    render() {
        const {tasks} = this.state;
        return (
            <div className="App">
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
                                    aria-describedby="new task"
                                />
                                <Button variant="outline-secondary" id="button-add">
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
