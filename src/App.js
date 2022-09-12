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

function App() {
    const tasks = [
        {
            "id": 1,
            "description": "Milch kaufen"
        },
        {
            "id": 2,
            "description": "Essen zubereiten"
        }
    ]
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

                        <ListGroup>
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

export default App;
