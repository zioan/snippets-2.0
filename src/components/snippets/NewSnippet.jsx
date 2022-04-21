import { useState, useContext } from 'react';
import SnippetContext from '../../context/SnippetContext';
import TagContext from '../../context/TagContext';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { FiSave } from 'react-icons/fi';

function NewSnippet({ onSaveHandler }) {
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
      onSaveHandler();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='mb-4 flex flex-col'>
      <h2>Create new snippet</h2>
      <form onSubmit={saveSnippetHandler}>
        <input
          type='text'
          placeholder='Title'
          className='input input-bordered w-full max-w-xs block mb-4'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* <br /> */}
        <select
          className='select select-bordered w-full max-w-xs  mb-4'
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
        <CodeEditor
          disabled={false}
          className='code-editor mb-4'
          value={code}
          onChange={(e) => setCode(e.target.value)}
          language='jsx'
          placeholder='Please enter your code.'
          padding={15}
          style={{
            fontFamily:
              'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
        />

        {error && <p className=' text-red-400 mb-4'>{error}</p>}
        <button className='btn' type='submit'>
          <FiSave className=' text-2xl' />
        </button>
      </form>
    </div>
  );
}

export default NewSnippet;
