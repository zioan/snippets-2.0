import axios from 'axios'
import { createContext, useContext, useState } from 'react'
import server from '../server'
import AuthContext from './AuthContext'

const SnippetContext = createContext()

export const SnippetProvider = ({ children }) => {
  const [snippets, setSnippets] = useState([])
  const [sharedSnippet, setSharedSnippet] = useState(null)
  const [editWarning, setEditWarning] = useState(false)
  const [loading, setLoading] = useState(false)
  const { user } = useContext(AuthContext)

  const getSnippets = async () => {
    try {
      // Needs to watch for updating bug ?!
      // bug happening here !
      setLoading(true)
      const snippetsRes = await axios.get(`${server}/snippets/all/${user.id}`)
      const sortedSnippetsByDate = await snippetsRes.data.sort((a, b) => {
        return new Date(b.timeStamp) - new Date(a.timeStamp)
      })
      setSnippets(sortedSnippetsByDate)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const getSharedSnippet = async (user_name, user_id, snippet_id) => {
    try {
      setLoading(true)
      const sharedSnippetData = await axios.get(
        `${server}/snippets/${user_name}/${user_id}/${snippet_id}`,
      )
      if (sharedSnippetData.data.length > 0) {
        setSharedSnippet(sharedSnippetData.data)
        setLoading(false)
      } else {
        setSharedSnippet(null)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const newSnippet = async (title, tag, code) => {
    const newSnippet = {
      user_id: user.id,
      title,
      tag,
      code,
    }
    try {
      await axios
        .post(`${server}/snippets/add`, newSnippet)
        .then(() => getSnippets())
    } catch (error) {
      console.log(error)
    }
  }

  const updateSnippet = async (snippetData) => {
    const updatedSnippetData = {
      user_id: user.id,
      title: snippetData.title,
      tag: snippetData.tag,
      code: snippetData.code,
    }
    try {
      axios
        .put(`${server}/snippets/update/${snippetData.id}`, updatedSnippetData)
        .then(() => getSnippets())
    } catch (error) {
      console.log(error)
    }
  }

  const showEditWarning = (warningState) => {
    setEditWarning(warningState)
  }

  const deleteSnippet = async (id) => {
    const userId = { user_id: user.id }
    try {
      await axios
        .post(`${server}/snippets/delete/${id}`, userId)
        .then(() => getSnippets())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SnippetContext.Provider
      value={{
        snippets,
        loading,
        getSnippets,
        newSnippet,
        updateSnippet,
        editWarning,
        showEditWarning,
        deleteSnippet,
        sharedSnippet,
        getSharedSnippet,
      }}
    >
      {children}
    </SnippetContext.Provider>
  )
}

export default SnippetContext
