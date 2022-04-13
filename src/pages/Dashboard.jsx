// import {} from "react";

import NewSnippet from '../components/snippets/NewSnippet'
import SnippetsList from '../components/snippets/SnippetsList'
import { useUserContext } from '../context/UserContext'

function Dashboard() {
  const { user } = useUserContext()

  return (
    <>
      <h2>Dashboard</h2>
      {user && <NewSnippet />}
      {user && <SnippetsList />}
    </>
  )
}

export default Dashboard
