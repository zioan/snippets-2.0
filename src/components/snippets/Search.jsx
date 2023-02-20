import { useEffect, useContext, useState } from 'react'
import SnippetContext from '../../context/SnippetContext'
import TagContext from '../../context/TagContext'
import Spinner from '../layout/Spinner'

function Search() {
  const [searchQuery, setSeatchQuery] = useState('')

  const {
    snippets,
    getSnippets,
    searchedSnippetsHandler,
    loading,
  } = useContext(SnippetContext)
  const { getTags, filteredTagValue } = useContext(TagContext)

  // Fetch snippets and tags on component load / reload
  useEffect(() => {
    getSnippets()
    getTags()
  }, [])

  // Search functionality
  let sorted = [...snippets]
  sorted = sorted.filter(
    (snippet) =>
      (snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        snippet.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        snippet.code.toLowerCase().includes(searchQuery.toLowerCase())) &&
      snippet.tag.toLowerCase().includes(filteredTagValue.toLowerCase()),
  )

  useEffect(() => {
    searchedSnippetsHandler(sorted)
  }, [snippets, searchQuery, filteredTagValue])

  return (
    <section className="relative ">
      {loading && <Spinner />}

      {/* Search bar */}
      {!loading && (
        <div className=" w-full md:w-[80%] flex items-center justify-center gap-8 my-4">
          <input
            type="text"
            placeholder="Search snippet..."
            className="input input-bordered w-[400px] md:w-[600px]"
            // className="input input-bordered w-full md:w-[80%] block mx-auto my-10 md:mt-10"
            value={searchQuery}
            onChange={(e) => setSeatchQuery(e.target.value)}
          />
        </div>
      )}
    </section>
  )
}

export default Search