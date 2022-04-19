import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (email, password) => {
    const loginDetails = {
      email,
      password,
    };
    try {
      await axios.post('http://localhost:5000/users/login', loginDetails);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserContext.Provider value={{ login, user }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
