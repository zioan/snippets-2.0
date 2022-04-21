import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import server from '../server';
import AuthContext from './AuthContext';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { getUser } = useContext(AuthContext);

  const login = async (email, password) => {
    const loginDetails = {
      email,
      password,
    };
    try {
      const userRes = await axios.post(`${server}/users/login`, loginDetails);
      getUser();
      setError('');
      console.log(userRes.data);
    } catch (error) {
      setError(error.response.data);
    }
  };

  const registerUser = async (name, email, password) => {
    const registerData = {
      name,
      email,
      password,
    };
    try {
      const userRes = await axios.post(
        `${server}/users/register`,
        registerData
      );
      getUser();
      setError('');
    } catch (error) {
      console.log(error);
      setError(error.response.data);
    }
  };

  const logoutUser = async () => {
    try {
      await axios.post(`${server}/users/logout`);
      getUser();
      setError('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider value={{ login, logoutUser, registerUser, error }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
