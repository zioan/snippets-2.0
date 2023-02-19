import React, { useContext } from 'react'
import SnippetContext from '../../context/SnippetContext'
import SnippetTemplate from './SnippetTemplate'

function SnippetsList() {
  const { snippets, getSnippets, searchedSnippets, loading } = useContext(
    SnippetContext,
  )

  return (
    <>
      {searchedSnippets.map((snippet) => {
        return <SnippetTemplate key={snippet.id} snippet={snippet} />
      })}
    </>
  )
}

export default SnippetsList
