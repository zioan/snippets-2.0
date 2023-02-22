import { useEffect, useContext, useState } from 'react'
import SnippetContext from '../../context/SnippetContext'
import TagContext from '../../context/TagContext'
import { IoMdClose } from 'react-icons/io'
import { uniq } from 'lodash'

function Search() {
  const [searchQuery, setSeatchQuery] = useState('')
  const { snippets, searchedSnippetsHandler, loading } = useContext(
    SnippetContext,
  )
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

  return (
    <section className="relative w-[400px] md:w-[600px]">
      {/* Search bar */}
      {!loading && (
        <div className=" w-full md:w-[80%] flex items-center justify-center my-4 border-[1px] border-gray-500 rounded-lg">
          <input
            type="text"
            placeholder="Search snippet..."
            className="w-full input focus:outline-none focus:ring-0"
            value={searchQuery}
            onChange={(e) => setSeatchQuery(e.target.value)}
          />
          {searchQuery.length > 0 && (
            <p className="cursor-default whitespace-nowrap w-min">
              {resultsCountString()}
            </p>
          )}
          <button className="cursor-pointer" onClick={() => setSeatchQuery('')}>
            <IoMdClose size={24} className="mx-2 fill-slate-300" />
          </button>
        </div>
      )}
    </section>
  )
}

export default Search
