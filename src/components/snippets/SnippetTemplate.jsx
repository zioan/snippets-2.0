import { useContext } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import SnippetContext from '../../context/SnippetContext';

function SnippetTemplate({ snippet }) {
  const { deleteSnippet } = useContext(SnippetContext);

  const deleteHandler = () => {
    if (window.confirm(`Are you sure you want to delete ${snippet.title}?`)) {
      deleteSnippet(snippet.id);
    }
  };

  return (
    <div className='  px-6 py-3 my-6 bg-slate-700'>
      <div className=' flex justify-between'>
        <h3 className=' text-xl font-bold mb-4 border-b-slate-800 border-b-2'>
          {snippet.title}
        </h3>
        <h4 className='badge p-4'>{snippet.tag}</h4>
      </div>
      <CodeEditor
        className='code-editor'
        value={snippet.code}
        language='jsx'
        placeholder='Please enter your code.'
        padding={15}
        style={{
          fontFamily:
            'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
        // onChange={(e) => setEditorCode(e.target.value)}
      />
      <button className='btn' onClick={deleteHandler}>
        Delete
      </button>
    </div>
  );
}

export default SnippetTemplate;
