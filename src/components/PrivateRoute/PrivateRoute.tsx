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
      {isLoggedIn ? children : null}

      <div style={{ border: "1px solid #777", borderRadius: 3, padding: 10, textAlign: "center", margin: "20px 0" }}>
        <p>This is a Keycloak-secured component of your application.</p>

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
    </>
  );
};
