import React, { useContext, useEffect, useRef, useState } from 'react'
import SnippetContext from '../../context/SnippetContext'
import SnippetTemplate from './SnippetTemplate'

function SnippetsList() {
  const { searchedSnippets } = useContext(SnippetContext)

  const [renderedData, setRenderedData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const loadThreshold = 1000 // define a threshold for how far from the bottom of the page to load more data
  const containerRef = useRef(null)

  useEffect(() => {
    setRenderedData(searchedSnippets.slice(0, currentPage * 10)) // render the first 10 items from the data
  }, [searchedSnippets, currentPage])

  useEffect(() => {
    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight)

      if (distanceFromBottom < loadThreshold && !isLoading) {
        setIsLoading(true)
        setCurrentPage((prevPage) => prevPage + 1)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isLoading])

  useEffect(() => {
    if (!isLoading) return

    // Simulate fetching more data from the server
    const fetchMoreData = () => {
      setTimeout(() => {
        setRenderedData((prevData) => [
          ...prevData,
          ...searchedSnippets.slice(prevData.length, currentPage * 10),
        ])
        setIsLoading(false)
      }, 1000)
    }

    fetchMoreData()
  }, [isLoading, searchedSnippets, currentPage])

  return (
    <div className="mt-[100px] flex flex-col gap-10">
      {renderedData.map((snippet) => (
        <SnippetTemplate key={snippet.id} snippet={snippet} />
      ))}
      <div ref={containerRef} style={{ height: '10px' }}>
        {isLoading && <div>Loading...</div>}
      </div>
    </div>
  )
}

export default SnippetsList
