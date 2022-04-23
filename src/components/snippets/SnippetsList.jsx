import { useEffect, useContext, useState } from 'react';
import SnippetContext from '../../context/SnippetContext';
import TagContext from '../../context/TagContext';
import FilterByTag from './FilterByTag';
import SnippetTemplate from './SnippetTemplate';

function SnippetsList() {
  const [searchQuery, setSeatchQuery] = useState('');

  const { snippets, getSnippets } = useContext(SnippetContext);
  const { getTags, filteredTagValue } = useContext(TagContext);

  // Fetch snippets and tags on component load / reload
  useEffect(() => {
    getSnippets();
    getTags();
  }, []);

  // Search functionality
  let sorted = [...snippets];
  sorted = sorted.filter(
    (snippet) =>
      (snippet.title.toLowerCase().includes(searchQuery) ||
        snippet.tag.toLowerCase().includes(searchQuery) ||
        snippet.code.toLowerCase().includes(searchQuery)) &&
      snippet.tag.toLowerCase().includes(filteredTagValue)
  );

  return (
    <section className=' relative'>
      {sorted.length < 1 && (
        <p className=' text-2xl text-center text-warning'>No Snippet found!</p>
      )}

      {/* Search bar */}
      <input
        type='text'
        placeholder='Search snippet...'
        className='input input-bordered w-full md:w-[80%] block mx-auto my-10 md:mt-10'
        value={searchQuery}
        onChange={(e) => setSeatchQuery(e.target.value)}
      />

      {sorted.map((snippet) => {
        return <SnippetTemplate key={snippet.id} snippet={snippet} />;
      })}
    </section>
  );
}

export default SnippetsList;
