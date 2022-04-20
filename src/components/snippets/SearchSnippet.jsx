import { useContext, useEffect, useState } from 'react';
import SnippetContext from '../../context/SnippetContext';

function SearchSnippet() {
  const [searchTerm, setSearchTerm] = useState('');
  const { snippets, searchSnippets } = useContext(SnippetContext);

  useEffect(() => {
    searchSnippets(searchTerm);
    console.log(searchTerm);
  });

  return (
    <>
      <input
        type='text'
        placeholder='Search...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </>
  );
}

export default SearchSnippet;
