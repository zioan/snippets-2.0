import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';
import server from '../server';
import AuthContext from './AuthContext';

const SnippetContext = createContext();

export const SnippetProvider = ({ children }) => {
  const [snippets, setSnippets] = useState([]);
  const { user } = useContext(AuthContext);

  const getSnippets = async () => {
    try {
      const snippetsRes = await axios.get(`${server}/snippets/all/${user.id}`);
      setSnippets(snippetsRes.data);
      console.log(snippetsRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const newSnippet = async (title, tag, code) => {
    const newSnippet = {
      user_id: user.id,
      title,
      tag,
      code,
    };
    try {
      await axios.post(`${server}/snippets/add`, newSnippet);
      getSnippets();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SnippetContext.Provider
      value={{
        snippets,
        getSnippets,
        newSnippet,
      }}
    >
      {children}
    </SnippetContext.Provider>
  );
};

export default SnippetContext;
