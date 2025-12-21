import { RouterProvider } from "react-router-dom";
import { Badge, Col, Container, Row } from "react-bootstrap";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import "izitoast/dist/js/iziToast.min";
import "./App.css";
import { useApi } from "~/hooks";
import keycloak from "~/auth/keycloak";
import { router } from "./routes";

const App = () => {
  const api = useApi();

  return (
    <div className="App">
      <Container className="mt-4">
        <Row>
          <Col className="col-lg-8 offset-lg-2">
            <ReactKeycloakProvider authClient={keycloak}>
              <RouterProvider router={router} />
              <h6 id="apiVersion">
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
  );
};

export default App;
