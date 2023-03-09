import React, { useRef } from 'react'
import { BsTags } from 'react-icons/bs'
import NewTag from '../NewTag'
import TagsEditor from '../TagsEditor'

function TagsModal() {
  const tagRef = useRef()

  const closeTagsModal = (e) => {
    if (e.key === 'Escape') {
      tagRef.current.click()
    }
  }

  return (
    <div>
      <label
        htmlFor="tagsModal"
        className="mb-4 normal-case btn btn-success modal-button"
      >
        <BsTags className="text-2xl " />
        <span className="ml-4">Tags Editor</span>
      </label>

      {/*  Put this part before </body> tag  */}
      <input
        type="checkbox"
        id="tagsModal"
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
            htmlFor="tagsModal"
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
    </div>
  )
}

export default TagsModal
