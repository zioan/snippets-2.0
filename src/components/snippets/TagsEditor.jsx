import { useContext } from 'react'
import TagContext from '../../context/TagContext'
import useNotification from '../../hooks/useNotification'

function TagsEditor() {
  const { tags, deleteTag } = useContext(TagContext)
  const { notificationHandler } = useNotification()

  const deleteHandler = (id, tag) => {
    if (window.confirm(`Are you sure you want to delete "${tag}"?`)) {
      deleteTag(id)
      notificationHandler({ type: 'warning', message: 'Tag deleted' })
    }
  }
  return (
    <>
      {tags.map((item) => {
        return (
          <h4
            key={item.id}
            className="p-4 cursor-pointer badge"
            onClick={() => deleteHandler(item.id, item.tag)}
          >
            {item.tag}
          </h4>
        )
      })}
    </>
  )
}

export default TagsEditor
