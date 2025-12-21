import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080/",
  // url: "/auth", // for use with reverse proxy
  realm: "todo-app",
  clientId: "todo-app",
});

export default keycloak;
