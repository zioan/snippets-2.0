import { useContext, useState } from 'react'
import AuthContext from '../../context/AuthContext'
import TagContext from '../../context/TagContext'

function FilterByTag() {
  const { tags, updateFilteredTag } = useContext(TagContext)
  const { user } = useContext(AuthContext)
  const [showTags, setShowTags] = useState(false)
  const [selectedTag, setSelectedTag] = useState('')

  const handlerToggler = () => {
    setShowTags(!showTags)
  }

  const handlerSortByTag = (tag) => {
    setSelectedTag(tag)
    updateFilteredTag(tag)
  }

  return (
    <>
      {user && (
        <button className="btn btn-success " onClick={handlerToggler}>
          {`Filter By Tag: ${selectedTag === '' ? 'All' : selectedTag}`}
        </button>
      )}

      {user
        ? showTags && (
            <div className="mt-4">
              <h4
                className="p-4 m-2 cursor-pointer badge"
                onClick={() => handlerSortByTag('')}
              >
                All
              </h4>
              {tags.map((item) => {
                return (
                  <h4
                    key={item.id}
                    className="p-4 m-2 cursor-pointer badge"
                    onClick={() => handlerSortByTag(item.tag)}
                  >
                    {item.tag}
                  </h4>
                )
              })}
            </div>
          )
        : null}
    </>
  )
}

export default FilterByTag
