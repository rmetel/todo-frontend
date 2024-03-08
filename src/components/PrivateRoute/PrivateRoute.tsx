import React, { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { User } from "~/models/User";

interface PrivateRouteProps {
  children: React.ReactElement | null;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { keycloak } = useKeycloak();
  const isLoggedIn = keycloak.authenticated;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (isLoggedIn) {
      keycloak.loadUserInfo().then((user) => {
        setUser(user as User);
      });
    }
  }, [isLoggedIn]);

  // console.log("keycloak", keycloak.loadUserInfo().then((data) => {console.log(data)}));
  return (
    <>
      <div
        style={{
          padding: "3em 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>{isLoggedIn ? `Welcome ${user?.name}!` : "Private area, please login..."}</h3>
        <div>
          {isLoggedIn ? (
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => keycloak.logout()}
            >
              Logout
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => keycloak.login()}
            >
              Login
            </button>
          )}
        </div>
      </div>

      {isLoggedIn ? children : null}
    </>
  );
};
