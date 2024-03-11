import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  // url: "http://localhost:8080/",
  url: "/keycloak",
  realm: "todo-app",
  clientId: "todo-app",
});

export default keycloak;
