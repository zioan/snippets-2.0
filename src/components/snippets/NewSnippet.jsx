import { useState, useContext } from 'react';
import SnippetContext from '../../context/SnippetContext';
import TagContext from '../../context/TagContext';
import CodeEditor from '@uiw/react-textarea-code-editor';

function NewSnippet() {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [selectedTag, setSelectedTag] = useState('No Tag');
  const [error, setError] = useState('');

  const { newSnippet } = useContext(SnippetContext);
  const { tags } = useContext(TagContext);

  const saveSnippetHandler = (e) => {
    e.preventDefault();
    if (title.length < 1) {
      setError('Title cannot be empty');
      return;
    }

    if (code.length < 1) {
      setError('Code cannot be empty');
      return;
    }
    try {
      newSnippet(title, selectedTag, code);
      setError('');
      setTitle('');
      setCode('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>Snippets</h2>
      <form onSubmit={saveSnippetHandler}>
        <input
          type='text'
          placeholder='Title'
          className='input input-bordered w-full max-w-xs'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className='select select-bordered w-full max-w-xs'
          onChange={(e) => setSelectedTag(e.target.value)}
          value={selectedTag}
        >
          {tags.map((tag) => {
            return (
              <option key={tag.id} value={tag.tag}>
                {tag.tag}
              </option>
            );
          })}
        </select>
        <div className='mockup-code'>
          {/* <textarea
            type='text'
            placeholder='code'
            value={code}
            onChange={(e) => setCode(e.target.value)}
          /> */}
          <CodeEditor
            className='code-editor'
            value={code}
            language='jsx'
            placeholder='Please enter your code.'
            padding={15}
            style={{
              fontFamily:
                'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        {error && <p className=' text-red-400'>{error}</p>}
        <button className='btn' type='submit'>
          save snippet
        </button>
      </form>
    </>
  );
}

export default NewSnippet;
