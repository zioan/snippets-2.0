import { useContext, useState } from 'react'
import AuthContext from '../../context/AuthContext'
import TagContext from '../../context/TagContext'
import Search from '../snippets/Search'

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
        <div className="flex items-center">
          <Search />
          <button className="btn btn-success " onClick={handlerToggler}>
            {`Filter By Tag: ${selectedTag === '' ? 'All' : selectedTag}`}
          </button>
        </div>
      )}

      {user
        ? showTags && (
            <div className="mt-0">
              <h4
                className="p-4 m-1 cursor-pointer badge"
                onClick={() => handlerSortByTag('')}
              >
                All
              </h4>
              {tags.map((item) => {
                return (
                  <h4
                    key={item.id}
                    className="p-4 m-1 cursor-pointer badge"
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
