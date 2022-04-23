import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import NewSnippet from '../components/snippets/NewSnippet';
import NewTag from '../components/snippets/NewTag';
import SnippetsList from '../components/snippets/SnippetsList';
import AuthContext from '../context/AuthContext';
import TagsEditor from '../components/snippets/TagsEditor';
import { VscNewFile } from 'react-icons/vsc';
import { BsTags } from 'react-icons/bs';

function Dashboard() {
  const { user } = useContext(AuthContext);

  const snippetRef = useRef();
  const tagRef = useRef();

  const closeSnippetsModal = (e) => {
    if (e.key === 'Escape') {
      snippetRef.current.click();
    }
  };

  const closeTagsModal = (e) => {
    if (e.key === 'Escape') {
      tagRef.current.click();
    }
  };

  return (
    <section>
      {/* If user is not logged in */}
      {!user && (
        <p className=' text-2xl'>
          You need to
          <Link className=' underline text-red-400 mx-2' to='/'>
            log in!
          </Link>
        </p>
      )}

      {/* If user is logged in */}
      {user && (
        <section>
          {/* Modal for new snippets */}
          {/* Button to open modal */}
          <label
            htmlFor='my-modal-1'
            className='btn btn-success btn-circle modal-button fixed bottom-48 right-4 z-20'
          >
            <VscNewFile className=' text-2xl' />
          </label>

          {/*  Put this part before </body> tag  */}
          <input
            type='checkbox'
            id='my-modal-1'
            className='modal-toggle '
            onKeyDown={closeSnippetsModal}
          />
          <div className='modal '>
            <div
              className='modal-box relative box-shadow'
              onKeyDown={closeSnippetsModal}
            >
              {/* Button to close modal */}
              <label
                htmlFor='my-modal-1'
                className='btn btn-sm btn-circle absolute right-2 top-2'
                ref={snippetRef}
              >
                ✕
              </label>

              {/* Modal content */}
              <h3 className=' text-2xl text-center mb-8'>Add new snippet</h3>
              <NewTag />
              <NewSnippet />
            </div>
          </div>

          {/* Modal for editing tags */}
          {/* Button to open modal */}
          <label
            htmlFor='my-modal-2'
            className='btn btn-success btn-circle modal-button fixed bottom-28 right-4 z-20'
          >
            <BsTags className=' text-2xl' />
          </label>

          {/*  Put this part before </body> tag  */}
          <input
            type='checkbox'
            id='my-modal-2'
            className='modal-toggle'
            onKeyDown={closeTagsModal}
          />
          <div className='modal'>
            <div
              className='modal-box relative box-shadow'
              onKeyDown={closeTagsModal}
            >
              {/* Button to close modal */}
              <label
                htmlFor='my-modal-2'
                className='btn btn-sm btn-circle absolute right-2 top-2'
                ref={tagRef}
              >
                ✕
              </label>

              {/* Modal content */}
              <h3 className=' text-2xl text-center mb-8'>Tags Editor</h3>
              <NewTag />

              <h4>Click tags to delete</h4>
              <div className=' flex gap-2 flex-wrap mt-4'>
                <TagsEditor />
              </div>
            </div>
          </div>

          {/* Snippets */}
          <SnippetsList />
        </section>
      )}
    </section>
  );
}

export default Dashboard;
