import { useRef } from 'react'
import { VscNewFile } from 'react-icons/vsc'
import NewSnippet from '../NewSnippet'
import NewTag from '../NewTag'

function NewSnippetModal() {
  const snippetRef = useRef()

  const closeSnippetsModal = (e) => {
    if (e.key === 'Escape') {
      snippetRef.current.click()
    }
  }

  return (
    <div>
      <label
        htmlFor="my-modal-1"
        className="btn btn-circle btn-sm modal-button"
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
    </div>
  )
}

export default NewSnippetModal
