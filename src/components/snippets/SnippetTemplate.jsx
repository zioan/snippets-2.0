import { useContext, useEffect, useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import SnippetContext from '../../context/SnippetContext';
import { BsTrash, BsShareFill } from 'react-icons/bs';
import { FiEdit3, FiCopy, FiSave } from 'react-icons/fi';
import TagContext from '../../context/TagContext';
import AuthContext from '../../context/AuthContext';
import NewTag from './NewTag';
import server from '../../server';

function SnippetTemplate({ snippet }) {
  const { updateSnippet, deleteSnippet, showEditWarning } =
    useContext(SnippetContext);
  const { tags } = useContext(TagContext);
  const { user } = useContext(AuthContext);

  // initialize state for snippet update
  const [editorMode, setEditorMode] = useState(false);
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const saveToClipboard = () => navigator.clipboard.writeText(snippet.code);

  // update state for snippet update
  const editHandler = () => {
    setEditorMode(!editorMode);
    setTitle(snippet.title);
    setTag(snippet.tag);
    setCode(snippet.code);
  };

  useEffect(() => {
    if (editorMode) {
      showEditWarning(true);
    } else {
      showEditWarning(false);
    }
  }, [editorMode]);

  // function for updating snippet
  const saveSnippet = () => {
    if (title.length < 1 || code.length < 1) {
      setError('Title or code snippet cannot be empty');
      return;
    }

    const snippetData = {
      id: snippet.id,
      tag,
      title,
      code,
    };
    updateSnippet(snippetData);
    setEditorMode(false);
    setTitle('');
    setTag('');
    setCode('');
  };

  // delete snippet on confirm
  const deleteHandler = () => {
    if (window.confirm(`Are you sure you want to delete "${snippet.title}"?`)) {
      deleteSnippet(snippet.id);
    }
  };

  //Create snippet share link
  const createShareLink = () => {
    const shareLink = `https://snippets.zioan.com/shared/${user.name}/${user.id}/${snippet.id}`;
    navigator.clipboard.writeText(shareLink);
  };

  return (
    // Handle both (snippet render from fetch) and (snippet update)
    <div
      className={'p-4 md:p-10 mt-4 mb-8 bg-base-200 rounded-[16px] box-shadow'}
    >
      {editorMode && (
        <>
          {/* Warning show on snippet edit mode */}
          <p className=' text-2xl text-success text-center mb-6'>
            Edit snippet
          </p>

          {/* Tag selector on snippet edit mode */}
          <NewTag />
          <p className=' inline'>Snippet tag:</p>
          <h4 className='badge  p-4 m-2'>{tag}</h4>
          {tags.length > 0 && (
            <p className=' mt-4'>Click to change snippet tag: </p>
          )}
          <div className='mb-4'>
            {tags.map((item) => {
              return (
                <h4
                  key={item.id}
                  className='badge p-4 cursor-pointer m-2'
                  onClick={() => setTag(item.tag)}
                >
                  {item.tag}
                </h4>
              );
            })}
          </div>
        </>
      )}
      <div className=' flex justify-between '>
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
            <p className=' text-left mb-1'>Snippet title:</p>
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

        <div className=' flex items-center mb-4'>
          {/* Show snippet tag NOT in edit mode */}
          {!editorMode && (
            <>
              <div className='tooltip ' data-tip='Snippet tag'>
                <h4 className='badge p-4 '>{snippet.tag}</h4>
              </div>
            </>
          )}

          {/* Share button */}
          <div className='tooltip' data-tip='Get share link'>
            <button className='btn  ml-6' onClick={createShareLink}>
              <BsShareFill className=' text-2xl' />
            </button>
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
        // tooltip display in edit mode only
        className={editorMode ? 'tooltip tooltip-left w-full  mr-6' : ''}
        data-tip='Edit code'
      >
        <div className='max-h-[500px] overflow-auto  mb-4'>
          {editorMode && <p className=' text-left my-1'>Snippet code:</p>}
          <CodeEditor
            disabled={editorMode ? false : true}
            className='code-editor bg-opacity-10 '
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
      </div>

      {/* Bottom buttons */}
      <div className='flex'>
        {/* Edit / Save button */}
        <div
          className=' inline tooltip tooltip-bottom'
          data-tip={editorMode ? 'Save snippet' : 'Edit snippet'}
        >
          <button
            className={editorMode ? 'btn text-success mr-4' : 'btn mr-4'}
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
