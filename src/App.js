import { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import axios from 'axios'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import About from './pages/About'
import Snippets from './pages/Snippets'
import SharedSnippet from './components/snippets/SharedSnippet'
import TagContext from './context/TagContext'
import SnippetContext from './context/SnippetContext'
import AuthContext from './context/AuthContext'
import useNotification from './hooks/useNotification'

axios.defaults.withCredentials = true

function App() {
  const { user } = useContext(AuthContext)
  const { getSnippets } = useContext(SnippetContext)
  const { getTags } = useContext(TagContext)
  const { displayNotification } = useNotification()

  useEffect(() => {
    if (user) {
      getSnippets()
      getTags()
    }
  }, [user])

  return (
    <Router>
      <Layout>
        <div className="px-3 pb-12">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/snippets" element={<Snippets />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/shared/:user_name/:user_id/:snippet_id"
              element={<SharedSnippet />}
            />

            <Route path="/notfound" element={<NotFound />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
          {displayNotification()}
        </div>
      </Layout>
    </Router>
  )
}

export default App
