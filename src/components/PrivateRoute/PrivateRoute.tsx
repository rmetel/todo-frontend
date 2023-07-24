import React from "react";
import { useKeycloak } from "@react-keycloak/web";

interface PrivateRouteProps {
  children: React.ReactElement | null;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { keycloak } = useKeycloak();

  const isLoggedIn = keycloak.authenticated;

  return (
    <>
      <div style={{
        padding: "3em 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h3>Private area, please login...</h3>
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
