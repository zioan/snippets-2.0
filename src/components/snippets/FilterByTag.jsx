import { useContext, useState } from 'react'
import AuthContext from '../../context/AuthContext'
import SnippetContext from '../../context/SnippetContext'
import TagContext from '../../context/TagContext'
import Search from '../snippets/Search'

function FilterByTag() {
  const { user } = useContext(AuthContext)
  const { tags, filteredTagValue, updateFilteredTag } = useContext(TagContext)
  const { snippets } = useContext(SnippetContext)
  const [showTags, setShowTags] = useState(false)
  const [selectedTag, setSelectedTag] = useState(filteredTagValue)

  const handlerToggler = () => {
    setShowTags(!showTags)
  }

  const handlerSortByTag = (tag) => {
    setSelectedTag(tag)
    updateFilteredTag(tag)
  }

  const totalSnippetsCount = snippets.length

  const getSnippetsCountByTag = (tag) => {
    return snippets.filter((snippet) => snippet.tag === tag).length || 0
  }

  const snippetsCountByTag = tags.map((item) => {
    return { tag: item.tag, count: getSnippetsCountByTag(item.tag) }
  })

  const allTags = `All (${totalSnippetsCount})`
  const tagCount = (selectedTag) => {
    const currentTagCount = snippetsCountByTag.find(
      (item) => item.tag === selectedTag,
    ).count
    return `${selectedTag} (${currentTagCount})`
  }

  return (
    <>
      {user && (
        <div className="flex justify-center mb-6">
          <button
            className="btn btn-success w-[300px]"
            onClick={handlerToggler}
          >
            {`Filter By Tag: ${
              selectedTag === '' ? allTags : tagCount(selectedTag)
            }`}
          </button>
        </div>
      )}

      {user
        ? showTags && (
            <div className="flex flex-wrap items-center gap-2">
              <h4
                className="p-4 m-1 cursor-pointer badge"
                onClick={() => handlerSortByTag('')}
              >
                All ({totalSnippetsCount})
              </h4>
              {tags.map((item) => {
                return (
                  <h4
                    key={item.id}
                    className="p-4 cursor-pointer badge"
                    onClick={() => handlerSortByTag(item.tag)}
                  >
                    {item.tag}
                    <span className="ml-2">
                      ({getSnippetsCountByTag(item.tag)})
                    </span>
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
