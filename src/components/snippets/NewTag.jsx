import { useState, useContext } from 'react'
import TagContext from '../../context/TagContext'
import useNotification from '../../hooks/useNotification'

function NewTag() {
  const [tag, setTag] = useState('')
  const [error, setError] = useState('')
  const { newTag } = useContext(TagContext)
  const { notificationHandler } = useNotification()

  const submitHandler = (e) => {
    e.preventDefault()
    if (tag.length < 1) {
      setError('Tag cannot be empty')
    } else {
      newTag(tag)
      setError('')
      setTag('')
      notificationHandler({ type: 'success', message: 'Successfully saved' })
    }
  }

  return (
    <div className="mb-6">
      <h2>Create new tag</h2>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter tag name"
          className="w-full max-w-xs input input-bordered"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />

        <button type="submit" className="btn">
          Save Tag
        </button>

        {error && <p className="text-red-400 ">{error}</p>}
      </form>
    </div>
  )
}

export default NewTag
