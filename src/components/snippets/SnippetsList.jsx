import { useEffect, useContext } from 'react';
import SnippetContext from '../../context/SnippetContext';
import AuthContext from '../../context/AuthContext';
import TagContext from '../../context/TagContext';
import SnippetTemplate from './SnippetTemplate';

function SnippetsList() {
  const { user } = useContext(AuthContext);

  const { snippets, getSnippets } = useContext(SnippetContext);
  const { getTags } = useContext(TagContext);

  // fetch snippets and tags on component load / reload
  useEffect(() => {
    getSnippets();
    getTags();
  }, []);

  return (
    <>
      {snippets.length < 1 && <p>No Snippets found!</p>}

      {snippets.map((snippet) => {
        return <SnippetTemplate key={snippet.id} snippet={snippet} />;
      })}
    </>
  );
}

export default SnippetsList;
