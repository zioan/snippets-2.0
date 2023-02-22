import { useEffect, useContext, useState } from 'react'
import SnippetContext from '../../context/SnippetContext'
import TagContext from '../../context/TagContext'
import { IoMdClose } from 'react-icons/io'

function Search() {
  const [searchQuery, setSeatchQuery] = useState('')

  const { snippets, searchedSnippetsHandler, loading } = useContext(
    SnippetContext,
  )
  const { filteredTagValue } = useContext(TagContext)

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
    <section className="relative w-[400px] md:w-[600px]">
      {/* Search bar */}
      {!loading && (
        <div className=" w-full md:w-[80%] flex items-center justify-center gap-8 my-4">
          <input
            type="text"
            placeholder="Search snippet..."
            className="w-full input input-bordered"
            value={searchQuery}
            onChange={(e) => setSeatchQuery(e.target.value)}
          />
          <button
            className="ml-[-70px] cursor-pointer"
            onClick={() => setSeatchQuery('')}
          >
            <IoMdClose size={24} className=" fill-slate-300" />
          </button>
        </div>
      )}
    </section>
  )
}

export default Search
