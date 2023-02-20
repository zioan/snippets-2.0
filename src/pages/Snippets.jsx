import { useContext, useEffect, useRef, useState } from 'react'
import NewSnippet from '../components/snippets/NewSnippet'
import NewTag from '../components/snippets/NewTag'
import TagsEditor from '../components/snippets/TagsEditor'
import { VscNewFile } from 'react-icons/vsc'
import { BsTags } from 'react-icons/bs'
import FilterByTag from '../components/snippets/FilterByTag'
import SnippetsList from '../components/snippets/SnippetsList'
import waitForServerResponse from '../helpers/checkForUser'
import SnippetContext from '../context/SnippetContext'
import Spinner from '../components/layout/Spinner'

function Dashboard() {
  const loggedIn = () => waitForServerResponse()
  const { loading } = useContext(SnippetContext)
  const [isComponentLoading, setIsComponentLoading] = useState(true)

  useEffect(() => {
    setIsComponentLoading(false)
  }, [])

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
    <section>
      {loading && <Spinner />}
      {isComponentLoading && <Spinner />}
      {!loading && (
        <div className=" hidden bg-base-100  top-[64px] z-50 p-4 md:flex flex-col w-full items-center fixed left-0">
          <FilterByTag />
        </div>
      )}
      {loggedIn && <SnippetsList />}
      {loggedIn && (
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
        </section>
      )}
    </section>
  )
}

export default Dashboard
