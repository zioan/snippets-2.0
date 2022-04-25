import { useEffect, useContext, useState } from 'react';
import SnippetContext from '../../context/SnippetContext';
import TagContext from '../../context/TagContext';
import Spinner from '../layout/Spinner';
import SnippetTemplate from './SnippetTemplate';

function SnippetsList() {
  const [searchQuery, setSeatchQuery] = useState('');

  const { snippets, getSnippets, loading } = useContext(SnippetContext);
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
      (snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        snippet.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        snippet.code.toLowerCase().includes(searchQuery.toLowerCase())) &&
      snippet.tag.toLowerCase().includes(filteredTagValue.toLowerCase())
  );

  return (
    <section className=' relative'>
      {/* {loading && <Spinner />} */}
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
