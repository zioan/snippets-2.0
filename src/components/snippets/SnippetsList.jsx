import { useEffect, useContext } from 'react';
import SnippetContext from '../../context/SnippetContext';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import server from '../../server';

function SnippetsList() {
  const { user } = useContext(AuthContext);

  const { snippets, getSnippets } = useContext(SnippetContext);

  useEffect(() => {
    getSnippets();
  }, []);

  return (
    <>
      <h2>SnippetsList</h2>
      {snippets.map((snippet) => {
        return (
          <div key={snippet.id}>
            <h3>{snippet.title}</h3>
            <h4>{snippet.tag}</h4>
            <h4>{snippet.code}</h4>
          </div>
        );
      })}
    </>
  );
}

export default SnippetsList;
