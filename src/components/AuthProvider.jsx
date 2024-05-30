import React, { createContext, useEffect, useState, useContext } from "react";
import { isUserLoggedIn } from "../service/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const loggedIn = isUserLoggedIn();
    console.log(loggedIn);
    setIsAuth(loggedIn);
  }, []);

  return <AuthContext.Provider value={isAuth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
