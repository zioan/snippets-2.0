import { useState, useContext } from 'react';
import SnippetContext from '../../context/SnippetContext';

function NewSnippet() {
  const [tag, setTag] = useState('');
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');

  const { newSnippet } = useContext(SnippetContext);

  const saveSnippetHandler = (e) => {
    e.preventDefault();
    newSnippet(title, tag, code);
  };

  return (
    <>
      <h2>Snippets</h2>
      <form onSubmit={saveSnippetHandler}>
        <input
          type='text'
          placeholder='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type='text'
          placeholder='tag'
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <input
          type='text'
          placeholder='code'
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type='submit'>save snippet</button>
      </form>
    </>
  );
}

export default NewSnippet;
