import { ReactKeycloakProvider } from "@react-keycloak/web";
import "izitoast/dist/js/iziToast.min";
import { Badge, Col, Container, Row } from "react-bootstrap";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import keycloak from "~/auth/keycloak";
import { PrivateRoute, Tasks } from "~/components";
import { Counter } from "~/components/Counter/Counter";
import { useApi } from "~/hooks";
import store from "~/store";
import { TaskView } from "~/views";
import "./App.css";

const App = () => {
  const api = useApi();

  return (
    <Provider store={store}>
      <div className="App">
        <Container className="mt-4">
          <Row>
            <Col className={"col-lg-8 offset-lg-2"}>
              <ReactKeycloakProvider authClient={keycloak}>
                <Router>
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <>
                          <Tasks />
                          <br />
                          <br />
                          <Counter />
                        </>
                      }
                    />
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
                  <Badge bg="info" className="mb-1">
                    fe: main 1.3.117
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
    </Provider>
  );
};

export default App;
