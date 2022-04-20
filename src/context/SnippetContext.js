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
      const sortedSnippetsByDate = snippetsRes.data.sort((a, b) => {
        return new Date(b.timeStamp) - new Date(a.timeStamp);
      });
      setSnippets(sortedSnippetsByDate);
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

  const deleteSnippet = async (id) => {
    const userId = { user_id: user.id };
    try {
      await axios.post(`${server}/snippets/delete/${id}`, userId);
      getSnippets();
    } catch (error) {
      console.log(error);
    }
  };

  const searchSnippets = (query) => {
    let sorted = [...snippets];

    sorted = sorted.filter((snippet) =>
      snippet.title.toLowerCase().includes(query)
    );
    console.log(sorted);
    // setSnippets(sorted);
  };

  return (
    <SnippetContext.Provider
      value={{
        snippets,
        getSnippets,
        newSnippet,
        deleteSnippet,
        searchSnippets,
      }}
    >
      {children}
    </SnippetContext.Provider>
  );
};

export default SnippetContext;
