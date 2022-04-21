import { useEffect, useContext, useState } from 'react';
import SnippetContext from '../../context/SnippetContext';
import TagContext from '../../context/TagContext';
import SnippetTemplate from './SnippetTemplate';

function SnippetsList() {
  const [searchQuery, setSeatchQuery] = useState('');

  const { snippets, getSnippets } = useContext(SnippetContext);
  const { getTags } = useContext(TagContext);

  // Fetch snippets and tags on component load / reload
  useEffect(() => {
    getSnippets();
    getTags();
  }, []);

  // Search functionality
  let sorted = [...snippets];

  sorted = sorted.filter(
    (snippet) =>
      snippet.title.toLowerCase().includes(searchQuery) ||
      snippet.code.toLowerCase().includes(searchQuery)
  );
  console.log(sorted);

  return (
    <>
      <input
        type='text'
        placeholder='Search snippet...'
        className='input input-bordered w-full md:w-[80%] block mx-auto my-10'
        value={searchQuery}
        onChange={(e) => setSeatchQuery(e.target.value)}
      />

      {sorted.length < 1 && <p>No Snippet found!</p>}

      {sorted.map((snippet) => {
        return <SnippetTemplate key={snippet.id} snippet={snippet} />;
      })}
    </>
  );
}

export default SnippetsList;
