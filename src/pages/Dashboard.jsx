import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import NewSnippet from '../components/snippets/NewSnippet';
import NewTag from '../components/snippets/NewTag';
import SearchSnippet from '../components/snippets/SearchSnippet';
import SnippetsList from '../components/snippets/SnippetsList';
import AuthContext from '../context/AuthContext';
import { FiSave } from 'react-icons/fi';
import TagsEditor from '../components/snippets/TagsEditor';

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [addNewSnippet, setAddNewSnippet] = useState(false);

  const newSnippetHandler = () => {
    if (!addNewSnippet) {
      window.scrollTo({ left: 0, top: 0 });
    }

    setAddNewSnippet(!addNewSnippet);
  };

  const onSaveHandler = () => {
    setAddNewSnippet(false);
  };

  return (
    <>
      {!user && (
        <p className=' text-2xl'>
          You need to
          <Link className=' underline text-red-400 mx-2' to='/'>
            log in!
          </Link>
        </p>
      )}
      {user && (
        <main>
          <SearchSnippet />
          <div
            className={
              addNewSnippet ? 'px-6 py-3 my-6 bg-slate-700' : 'py-3 my-6'
            }
          >
            {addNewSnippet && (
              <>
                <NewTag />
                <NewSnippet onSaveHandler={onSaveHandler} />
              </>
            )}
            <button className='btn my-4' onClick={newSnippetHandler}>
              {addNewSnippet ? 'Cancel' : 'Add New Snippet'}
            </button>
          </div>
          {/* <!-- The button to open modal --> */}
          <label htmlFor='my-modal-3' className='btn modal-button'>
            open modal
          </label>

          {/* <!-- Put this part before </body> tag --> */}
          <input type='checkbox' id='my-modal-3' className='modal-toggle' />
          <div className='modal'>
            <div className='modal-box relative'>
              <label
                htmlFor='my-modal-3'
                className='btn btn-sm btn-circle absolute right-2 top-2'
              >
                ✕
              </label>
              <h3 className=' text-2xl text-center mb-8'>Tags Editor</h3>
              <NewTag />

              <h4>Click tags to delete</h4>
              <div className=' flex gap-2 flex-wrap mt-4'>
                <TagsEditor />
              </div>
            </div>
          </div>
          <SnippetsList />
        </main>
      )}
    </>
  );
}

export default Dashboard;
