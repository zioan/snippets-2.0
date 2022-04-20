import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import server from '../server';

const AuthContext = createContext();

function AuthProvider(props) {
  const [user, setUser] = useState(undefined);

  async function getUser() {
    const userRes = await axios.get(`${server}/users/loggedin`);
    setUser(userRes.data);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, getUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthProvider };
