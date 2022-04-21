import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import NewSnippet from '../components/snippets/NewSnippet';
import NewTag from '../components/snippets/NewTag';
import SnippetsList from '../components/snippets/SnippetsList';
import AuthContext from '../context/AuthContext';
import TagsEditor from '../components/snippets/TagsEditor';
import { VscNewFile, VscClose } from 'react-icons/vsc';
import { BsTags } from 'react-icons/bs';
import { useDrag } from 'react-use-gesture';

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [addNewSnippet, setAddNewSnippet] = useState(false);
  const [editorPos, setEditorPos] = useState({ x: 0, y: 0 });

  const newSnippetHandler = () => {
    // if (!addNewSnippet) {
    //   window.scrollTo({ left: 0, top: 0 });
    // }

    setAddNewSnippet(!addNewSnippet);
  };

  const onSaveHandler = () => {
    setAddNewSnippet(false);
  };

  const bindEditorPosition = useDrag((params) => {
    setEditorPos({
      x: params.offset[0],
      y: params.offset[1],
    });
  });

  const handleKey = (e) => {
    if (e.key === 'Escape') {
      setAddNewSnippet(false);
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
        <section className=''>
          <div
            {...bindEditorPosition()}
            onKeyDown={handleKey}
            className=' z-30 cursor-pointer md:relative'
            style={{
              top: editorPos.y,
              left: editorPos.x,
              userSelect: 'none',
            }}
          >
            <div className=' md:absolute w-full md:w-[600px] max-w-[600px]  z-30'>
              {/* New snippet */}
              <div
                className={
                  addNewSnippet ? 'px-6 py-3 my-6 bg-slate-600' : 'py-3 my-6'
                }
              >
                {addNewSnippet && (
                  <>
                    <div
                      className='tooltip float-right'
                      data-tip='Esc key also works :)'
                    >
                      <h4 className='badge p-4 bg-red-400 text-slate-50 border-0 '>
                        Drag and Drop
                      </h4>
                    </div>
                    <NewTag />
                    <NewSnippet onSaveHandler={onSaveHandler} />
                  </>
                )}
                <button
                  className='btn btn-success btn-circle fixed bottom-40 right-4 z-20'
                  onClick={newSnippetHandler}
                >
                  {addNewSnippet ? (
                    <VscClose className=' text-2xl' />
                  ) : (
                    <VscNewFile className=' text-2xl' />
                  )}
                </button>
              </div>

              {/* Modal for editing tags */}
              {/* Button to open modal */}
              <label
                htmlFor='my-modal-3'
                className='btn btn-success btn-circle modal-button fixed bottom-20 right-4 z-20'
              >
                <BsTags className=' text-2xl' />
              </label>

              {/*  Put this part before </body> tag  */}
              <input type='checkbox' id='my-modal-3' className='modal-toggle' />
              <div className='modal'>
                <div className='modal-box relative'>
                  {/* Button to close modal */}
                  <label
                    htmlFor='my-modal-3'
                    className='btn btn-sm btn-circle absolute right-2 top-2'
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
