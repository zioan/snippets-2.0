import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import server from "../server";

const AuthContext = createContext();

function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  async function getUser() {
    try {
      const userRes = await axios.get(`${server}/users/loggedin`);
      setUser(userRes.data);
    } catch (error) {
      console.error(error);
      setUser(null);
    } finally {
      setIsInitializing(false);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return <AuthContext.Provider value={{ user, getUser, isInitializing }}>{props.children}</AuthContext.Provider>;
}

export default AuthContext;
export { AuthProvider };
