import { createContext, useState, useEffect } from 'react';

const SnippetContext = createContext();

export const SnippetProvider = ({ children }) => {
  const [snippets, setSnippets] = useState([]);

  const updateSnippets = (data) => {
    // console.log(data)
    setSnippets((prevState) => {
      return [prevState, data];
    });
  };

  return (
    <SnippetContext.Provider
      value={{
        snippets,
        updateSnippets,
      }}
    >
      {children}
    </SnippetContext.Provider>
  );
};

export default SnippetContext;
