import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import { Col, Row } from "react-bootstrap";

interface PrivateRouteProps {
  children: React.ReactElement | null;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { keycloak } = useKeycloak();

  const isLoggedIn = keycloak.authenticated;

  return (
    <>
      <div style={{
        border: "1px solid #777",
        borderRadius: 3,
        padding: 10,
        margin: "20px 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>This is a Keycloak-secured component of your application.</div>
        <div>
          {isLoggedIn ?
            <button type="submit" className="btn btn-primary" onClick={() => keycloak.logout()}>
              Logout
            </button>
            :
            <button type="submit" className="btn btn-primary" onClick={() => keycloak.login()}>
              Login
            </button>
          }
        </div>
      </div>

      {isLoggedIn ? children : null}
    </>
  );
};
