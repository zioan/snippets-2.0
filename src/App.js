import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import axios from 'axios'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import About from './pages/About'
import Snippets from './pages/Snippets'
import SharedSnippet from './components/snippets/SharedSnippet'

axios.defaults.withCredentials = true

function App() {
  return (
    <Router>
      <div className="flex flex-col justify-between min-h-screen">
        {/* <div className='min-h-screen'> */}
        <Navbar className="row-start-1" />
        <main className="container relative px-3 pb-12 mx-auto ">
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
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
