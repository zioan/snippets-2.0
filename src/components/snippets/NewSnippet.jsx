import { useState, useContext } from 'react'
import SnippetContext from '../../context/SnippetContext'
import TagContext from '../../context/TagContext'
import CodeEditor from '@uiw/react-textarea-code-editor'
import { FiSave } from 'react-icons/fi'
import useNotification from '../../hooks/useNotification'

function NewSnippet() {
  const [title, setTitle] = useState('')
  const [code, setCode] = useState('')
  const [selectedTag, setSelectedTag] = useState('No tag')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const { notificationHandler } = useNotification()

  const { newSnippet } = useContext(SnippetContext)
  const { tags } = useContext(TagContext)

  const saveSnippetHandler = (e) => {
    e.preventDefault()

    if (title.length < 1) {
      setError('Title cannot be empty')
      return
    }

    if (code.length < 1) {
      setError('Code cannot be empty')
      return
    }

    try {
      newSnippet(title, selectedTag, code)
      setError('')
      setTitle('')
      setCode('')
      setSuccessMessage('Snippet created')
      setInterval(() => {
        setSuccessMessage('')
      }, 4000)
      notificationHandler({ type: 'success', message: 'Successfully saved' })
    } catch (error) {
      console.log(error)
      notificationHandler({ type: 'error', message: 'Something went wrong' })
    }
  }

  return (
    <div className="flex flex-col mb-4">
      <label className="block">Create new snippet</label>
      <form onSubmit={saveSnippetHandler}>
        {/* Snippet title */}
        <input
          type="text"
          placeholder="Enter snippet title"
          className="block w-full max-w-xs mb-4 input input-bordered"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Snippet tag */}
        <label className="block">Select tag</label>
        <select
          className="w-full max-w-xs mb-4 select select-bordered"
          onChange={(e) => setSelectedTag(e.target.value)}
          value={selectedTag}
        >
          {tags.map((tag) => {
            return (
              <option key={tag.id} value={tag.tag}>
                {tag.tag}
              </option>
            )
          })}
        </select>

        {/* Snippet code. react-textarea-code-editor component */}
        <div className="overflow-auto max-h-96">
          <label className="block">Code editor</label>
          <CodeEditor
            disabled={false}
            className="code-editor "
            value={code}
            onChange={(e) => setCode(e.target.value)}
            language="jsx"
            placeholder="Paste your code here"
            padding={15}
            style={{
              fontFamily:
                'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
          />
        </div>

        {/* Display errors if empty fields */}
        {error && <p className="mt-4 text-center text-red-400 ">{error}</p>}
        {successMessage && (
          <p className="mt-4 text-center text-success">{successMessage}</p>
        )}

        <button className="mt-4 btn" type="submit">
          <FiSave className="text-2xl " />
        </button>
      </form>
    </div>
  )
}

export default NewSnippet
