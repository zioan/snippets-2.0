import { useContext, useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import SnippetContext from '../../context/SnippetContext';
import { BsTrash } from 'react-icons/bs';
import { FiEdit3, FiCopy, FiSave } from 'react-icons/fi';

function SnippetTemplate({ snippet }) {
  const [editorMode, setEditorMode] = useState(false);
  const { getSnippets, editSnippet, deleteSnippet } =
    useContext(SnippetContext);

  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const saveToClipboard = () => navigator.clipboard.writeText(snippet.code);

  const editHandler = () => {
    setEditorMode(!editorMode);
    setTitle(snippet.title);
    setCode(snippet.code);
    // editSnippet()
  };

  const saveSnippet = () => {
    if (title.length < 1 || code.length < 1) {
      setError('Title or code snippet cannot be empty');
      return;
    }

    const snippetData = {
      id: snippet.id,
      tag: snippet.tag,
      title,
      code,
    };
    editSnippet(snippetData);
    setEditorMode(false);
    setTitle('');
    setCode('');
  };

  const deleteHandler = () => {
    if (window.confirm(`Are you sure you want to delete "${snippet.title}"?`)) {
      deleteSnippet(snippet.id);
    }
  };

  return (
    <div
      className={
        editorMode
          ? 'px-6 py-3 mt-4 mb-8 bg-slate-800'
          : 'px-6 py-3 mt-4 mb-8 bg-slate-700'
      }
    >
      {editorMode && <p className=' text-xl text-red-400 mb-3'>Edit snippet</p>}
      <div className=' flex justify-between'>
        {/* Snippet title not in edit mode */}
        {!editorMode && (
          <h3 className=' text-xl font-bold mb-4 border-b-slate-800 border-b-2'>
            {snippet.title}
          </h3>
        )}

        {/* edit snippet */}
        {editorMode && (
          <div
            className='tooltip tooltip-left w-full  mr-6 mb-4'
            data-tip='Edit title'
          >
            <input
              type='text'
              placeholder='Title'
              className='input input-bordered w-full'
              value={editorMode ? title : snippet.title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {error && <p className=' text-red-400 text-left my-4'>{error}</p>}
          </div>
        )}

        {/* Snippet tag */}
        <div className=' flex items-center mb-2'>
          <div className='tooltip ' data-tip='Snippet tag'>
            <h4 className='badge p-4 '>{snippet.tag}</h4>
          </div>

          {/* Copy to clipboard top button */}
          <div className='tooltip' data-tip='Copy to clipboard'>
            <button className='btn  ml-6' onClick={saveToClipboard}>
              <FiCopy className=' text-2xl' />
            </button>
          </div>
        </div>
      </div>
      <div
        className={editorMode ? 'tooltip tooltip-left w-full  mr-6' : ''}
        data-tip='Edit code'
      >
        <CodeEditor
          disabled={editorMode ? false : true}
          className='code-editor mb-4'
          value={editorMode ? code : snippet.code}
          onChange={(e) => setCode(e.target.value)}
          language='jsx'
          placeholder='Please enter your code.'
          padding={15}
          style={{
            fontFamily:
              'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
        />
      </div>

      {/* Bottom buttons */}
      <div className='flex'>
        {/* Edit / Save button */}
        <div
          className=' inline tooltip tooltip-bottom'
          data-tip={editorMode ? 'Save snippet' : 'Edit snippet'}
        >
          <button
            className='btn mr-4'
            onClick={editorMode ? saveSnippet : editHandler}
          >
            {editorMode ? (
              <FiSave className=' text-2xl' />
            ) : (
              <FiEdit3 className=' text-2xl' />
            )}
          </button>
        </div>

        {/* Delete button */}
        {!editorMode && (
          <div className='tooltip  tooltip-bottom' data-tip='Delete snippet'>
            <button className='btn  mr-4' onClick={deleteHandler}>
              <BsTrash className=' text-2xl' />
            </button>
          </div>
        )}

        {/* Copy to clipboard bottom button */}
        <div
          className=' inline tooltip  tooltip-bottom'
          data-tip='Copy to clipboard'
        >
          <button className='btn mr-4' onClick={saveToClipboard}>
            <FiCopy className=' text-2xl' />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SnippetTemplate;
