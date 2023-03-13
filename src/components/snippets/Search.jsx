import { useEffect, useContext, useState } from 'react'
import SnippetContext from '../../context/SnippetContext'
import TagContext from '../../context/TagContext'
import { IoMdClose } from 'react-icons/io'
import { uniq } from 'lodash'

function Search() {
  const [searchQuery, setSeatchQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const { snippets, searchedSnippetsHandler } = useContext(SnippetContext)
  const { filteredTagValue } = useContext(TagContext)
  let sorted = [...snippets]

  const searchWords = searchQuery.trim().split(' ') || []

  const checkSnippetForMatch = (snippet, part, string) => {
    return snippet[part].toLowerCase().includes(string.toLowerCase())
  }
  const snippetIncludeSelectedTag = checkSnippetForMatch

  const isSnippetContainingWord = (snippet, word) => {
    return (
      (checkSnippetForMatch(snippet, 'title', word) ||
        checkSnippetForMatch(snippet, 'code', word)) &&
      snippetIncludeSelectedTag(snippet, 'tag', filteredTagValue)
    )
  }

  if (searchWords.length > 0) {
    sorted = []
    searchWords.map((word) => {
      return snippets.map((snippet) => {
        return isSnippetContainingWord(snippet, word) && sorted.push(snippet)
      })
    })
    sorted = uniq(sorted)
  }

  useEffect(() => {
    searchedSnippetsHandler(sorted)
  }, [snippets, searchQuery, filteredTagValue])

  const resultsCountString = () => {
    return filteredTagValue !== ''
      ? `${filteredTagValue}: ${sorted.length}`
      : `Results: ${sorted.length}`
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    if (searchQuery === '') {
      setIsFocused(false)
    }
  }

  return (
    <section
      className={`${
        isFocused ? 'w-[400px]' : 'w-[250px]'
      } transition-all duration-300`}
    >
      {/* Search bar */}

      <div className="flex items-center justify-center border-[1px] border-gray-500 rounded-lg">
        <input
          type="text"
          placeholder="Search..."
          className="w-full h-8 input focus:outline-none focus:ring-0"
          value={searchQuery}
          onChange={(e) => setSeatchQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {searchQuery.length > 0 && (
          <p className="ml-2 cursor-default whitespace-nowrap w-min">
            {resultsCountString()}
          </p>
        )}
        <button
          className="cursor-pointer bg-"
          onClick={() => {
            setIsFocused(false)
            setSeatchQuery('')
          }}
        >
          <IoMdClose size={24} className="mx-2 bg-transparent fill-slate-300" />
        </button>
      </div>
    </section>
  )
}

export default Search
