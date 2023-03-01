import { useContext, useEffect, useState, useRef } from 'react'
import CodeEditor from '@uiw/react-textarea-code-editor'
import SnippetContext from '../../context/SnippetContext'
import { BsTrash } from 'react-icons/bs'
import { FiEdit3, FiShare2, FiCopy, FiSave } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import TagContext from '../../context/TagContext'
import AuthContext from '../../context/AuthContext'
import NewTag from './NewTag'

function SnippetTemplate({ snippet }) {
  const {
    updateSnippet,
    deleteSnippet,
    showEditWarning,
    setSnippetRef,
  } = useContext(SnippetContext)
  const { tags } = useContext(TagContext)
  const { user } = useContext(AuthContext)

  // initialize state for snippet update
  const [editorMode, setEditorMode] = useState(false)
  const [title, setTitle] = useState('')
  const [tag, setTag] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const snippetRef = useRef(null)

  const saveToClipboard = () => navigator.clipboard.writeText(snippet.code)

  useEffect(() => {
    if (editorMode) {
      showEditWarning(true)
    } else {
      showEditWarning(false)
    }
  }, [editorMode])

  const editHandler = () => {
    setEditorMode(!editorMode)
    setSnippetRef(snippetRef)
    setTitle(snippet.title)
    setTag(snippet.tag)
    setCode(snippet.code)
  }

  const cancelHelper = () => {
    setEditorMode(false)
    setSnippetRef(null)
    setTitle('')
    setTag('')
    setCode('')
  }

  const cancelHandler = () => {
    if (
      tag !== snippet.tag ||
      title !== snippet.title ||
      code !== snippet.code
    ) {
      if (window.confirm('Do you want to discard changes?')) {
        cancelHelper()
      }
    } else {
      cancelHelper()
    }
  }

  const saveSnippet = () => {
    if (title.length < 1 || code.length < 1) {
      setError('Title or code snippet cannot be empty')
      return
    }

    const snippetData = {
      id: snippet.id,
      tag,
      title,
      code,
    }
    updateSnippet(snippetData)
    setEditorMode(false)
    setTitle('')
    setTag('')
    setCode('')
  }

  const deleteHandler = () => {
    if (window.confirm(`Are you sure you want to delete "${snippet.title}"?`)) {
      deleteSnippet(snippet.id)
    }
  }

  const createShareLink = () => {
    const shareLink = `https://snippets.zioan.com/shared/${user.name}/${user.id}/${snippet.id}`
    navigator.clipboard.writeText(shareLink)
  }

  return (
    <div
      ref={snippetRef}
      className={'p-4 md:p-10 mt-4 mb-8 bg-base-200 rounded-[16px] box-shadow'}
    >
      {editorMode && (
        <>
          {/* Warning show on snippet edit mode */}
          <p className="mb-6 text-2xl text-center text-success">Edit snippet</p>

          {/* Tag selector on snippet edit mode */}
          <NewTag />
          <p className="inline ">Snippet tag:</p>
          <h4 className="p-4 m-2 badge">{tag}</h4>
          {tags.length > 0 && (
            <p className="mt-4 ">Click to change snippet tag: </p>
          )}
          <div className="mb-4">
            {tags.map((item) => {
              return (
                <h4
                  key={item.id}
                  className="p-4 m-2 cursor-pointer badge"
                  onClick={() => setTag(item.tag)}
                >
                  {item.tag}
                </h4>
              )
            })}
          </div>
        </>
      )}
      <div className="flex justify-between ">
        {/* Snippet title not in edit mode */}
        {!editorMode && (
          <h3 className="mb-4 text-xl font-bold underline border-b-2 border-b-slate-800">
            {snippet.title}
          </h3>
        )}

        {/* edit snippet */}
        {editorMode && (
          <div
            className="w-full mb-4 mr-6 tooltip tooltip-left"
            data-tip="Edit title"
          >
            <p className="mb-1 text-left ">Snippet title:</p>
            <input
              type="text"
              placeholder="Title"
              className="w-full input input-bordered"
              value={editorMode ? title : snippet.title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {error && <p className="my-4 text-left text-red-400 ">{error}</p>}
          </div>
        )}

        <div className="flex items-center mb-4 ">
          {/* Show snippet tag NOT in edit mode */}
          {!editorMode && (
            <>
              <div
                className="mr-4 cursor-default tooltip"
                data-tip="Snippet tag"
              >
                <h4 className="p-4 badge ">{snippet.tag}</h4>
              </div>
            </>
          )}

          {/* New layout */}
          <div className="flex">
            {/* Edit / Save button */}
            <div
              className="inline tooltip"
              data-tip={editorMode ? 'Save snippet' : 'Edit snippet'}
            >
              <button
                className={editorMode ? 'btn text-success mr-1' : 'btn mr-1'}
                onClick={editorMode ? saveSnippet : editHandler}
              >
                {editorMode ? (
                  <FiSave className="text-2xl " />
                ) : (
                  <FiEdit3 className="text-2xl " />
                )}
              </button>
            </div>

            {/* Delete button */}
            {!editorMode && (
              <div className="tooltip" data-tip="Delete snippet">
                <button className="mr-1 btn" onClick={deleteHandler}>
                  <BsTrash className="text-2xl " />
                </button>
              </div>
            )}
            {/* Cancel button */}
            {editorMode && (
              <div className="tooltip" data-tip="Cancel">
                <button className="mr-1 btn" onClick={cancelHandler}>
                  <AiOutlineClose className="text-2xl " />
                </button>
              </div>
            )}
            {/* Share button */}
            {!editorMode && (
              <div className="tooltip" data-tip="Get share link">
                <button className="mr-1 btn" onClick={createShareLink}>
                  <FiShare2 className="text-xl " />
                </button>
              </div>
            )}
            {/* Copy to clipboard bottom button */}
            <div className="inline tooltip" data-tip="Copy to clipboard">
              <button className="mr-1 btn" onClick={saveToClipboard}>
                <FiCopy className="text-2xl " />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        // tooltip display in edit mode only
        className={editorMode ? 'tooltip tooltip-left w-full  mr-6' : ''}
        data-tip="Edit code"
      >
        <div className="max-h-[500px] overflow-auto  mb-4">
          {editorMode && <p className="my-1 text-left ">Snippet code:</p>}
          <CodeEditor
            disabled={editorMode ? false : true}
            className="code-editor bg-opacity-10 "
            value={editorMode ? code : snippet.code}
            onChange={(e) => setCode(e.target.value)}
            language="jsx"
            placeholder="Please enter your code."
            padding={15}
            style={{
              fontFamily:
                'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default SnippetTemplate
