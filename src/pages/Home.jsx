import { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Auth from '../components/layout/Auth'
import Spinner from '../components/layout/Spinner'
import AuthContext from '../context/AuthContext'
import UserContext from '../context/UserContext'
import SnippetContext from '../context/SnippetContext'
// import { Link } from 'react-router-dom';
import SnippetsList from '../components/snippets/SnippetsList'
import NewSnippet from '../components/snippets/NewSnippet'
import NewTag from '../components/snippets/NewTag'
import TagsEditor from '../components/snippets/TagsEditor'
import { VscNewFile } from 'react-icons/vsc'
import { BsTags } from 'react-icons/bs'

function Home() {
  // const { loading, logoutUser } = useContext(UserContext)
  const { snippets, getSnippets, loading } = useContext(SnippetContext)
  const { user } = useContext(AuthContext)
  // const navigate = useNavigate();

  const snippetRef = useRef()
  const tagRef = useRef()

  const closeSnippetsModal = (e) => {
    if (e.key === 'Escape') {
      snippetRef.current.click()
    }
  }

  const closeTagsModal = (e) => {
    if (e.key === 'Escape') {
      tagRef.current.click()
    }
  }

  return (
    <>
      {/* {loading && <Spinner />} */}

      {/* If user is logged in */}
      {user && (
        <section>
          {/* Modal for new snippets */}
          {/* Button to open modal */}
          <label
            htmlFor="my-modal-1"
            className="fixed z-20 btn btn-success btn-circle modal-button bottom-48 right-4"
          >
            <VscNewFile className="text-2xl " />
          </label>

          {/*  Put this part before </body> tag  */}
          <input
            type="checkbox"
            id="my-modal-1"
            className="modal-toggle "
            onKeyDown={closeSnippetsModal}
          />
          <div className="modal ">
            <div
              className="relative modal-box box-shadow"
              onKeyDown={closeSnippetsModal}
            >
              {/* Button to close modal */}
              <label
                htmlFor="my-modal-1"
                className="absolute btn btn-sm btn-circle right-2 top-2"
                ref={snippetRef}
              >
                ✕
              </label>

              {/* Modal content */}
              <h3 className="mb-8 text-2xl text-center ">Add new snippet</h3>
              <NewTag />
              <NewSnippet />
            </div>
          </div>

          {/* Modal for editing tags */}
          {/* Button to open modal */}
          <label
            htmlFor="my-modal-2"
            className="fixed z-20 btn btn-success btn-circle modal-button bottom-28 right-4"
          >
            <BsTags className="text-2xl " />
          </label>

          {/*  Put this part before </body> tag  */}
          <input
            type="checkbox"
            id="my-modal-2"
            className="modal-toggle"
            onKeyDown={closeTagsModal}
          />
          <div className="modal">
            <div
              className="relative modal-box box-shadow"
              onKeyDown={closeTagsModal}
            >
              {/* Button to close modal */}
              <label
                htmlFor="my-modal-2"
                className="absolute btn btn-sm btn-circle right-2 top-2"
                ref={tagRef}
              >
                ✕
              </label>

              {/* Modal content */}
              <h3 className="mb-8 text-2xl text-center ">Tags Editor</h3>
              <NewTag />

              <h4>Click tags to delete</h4>
              <div className="flex flex-wrap gap-2 mt-4 ">
                <TagsEditor />
              </div>
            </div>
          </div>

          {/* Snippets */}
          <SnippetsList />
        </section>
      )}

      {/* Load Auth layout component if no user / guest */}
      {!user && <Auth />}
    </>
  )
}

export default Home
