import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  // url: "http://localhost:8080/",
  url: "https://todo-app.tech:8443",
  realm: "todo-app",
  clientId: "todo-app",
});

export default keycloak;
