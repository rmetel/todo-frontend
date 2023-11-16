import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Badge, Col, Container, Row } from "react-bootstrap";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import "izitoast/dist/js/iziToast.min";
import "./App.css";
import { Tasks } from "~/components";
import { useApi } from "~/hooks";
import { TaskView } from "~/views";
import keycloak from "~/auth/keycloak";
import { PrivateRoute } from "~/components";

const App = () => {
  const api = useApi();

  return (
    <div className="App">
      <Container className="mt-4">
        <Row>
          <Col className={"col-lg-8 offset-lg-2"}>
            <ReactKeycloakProvider authClient={keycloak}>
              <Router>
                <Routes>
                  <Route path="/" element={<Tasks />} />
                  <Route
                    path="/secure"
                    element={
                      <PrivateRoute>
                        <h2>Secured Page</h2>
                      </PrivateRoute>
                    }
                  />
                  <Route path="/tasks/:taskId" element={<TaskView />} />
                </Routes>
              </Router>
              <h6 id={"apiVersion"}>
                <Badge bg="info">
                  fe: main 1.3.113
                </Badge>
                <br />
                <Badge bg="secondary">
                  be: {api.branch} {api.version}
                </Badge>
              </h6>
            </ReactKeycloakProvider>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
