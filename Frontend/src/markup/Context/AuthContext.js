import React, { useContext, useEffect, useState } from "react";
import createRequest from "../../utils/axios";

export const AuthContext = React.createContext();

export function useUser() {
  return useContext(AuthContext);
}

function UserProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    const accessToken = localStorage.getItem("access_token");

    createRequest()
      .post(`/dj-rest-auth/token/verify/`, { token: accessToken })
      .then((res) => {
        //console.log(res?.data?.user);
        setUser({});
        setIsAuthenticated(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const signIn = (userDetails) => {
    setUser(userDetails);
    setIsAuthenticated(true);
  };

  const signOut = () => {
    localStorage.clear();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export default UserProvider;
