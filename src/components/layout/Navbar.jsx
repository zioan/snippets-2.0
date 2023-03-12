import { useState, useContext } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import { FaCode, FaSun, FaMoon, FaBars } from 'react-icons/fa'
import { CgClose } from 'react-icons/cg'
import { MdWarningAmber } from 'react-icons/md'
import AuthContext from '../../context/AuthContext'
import SnippetContext from '../../context/SnippetContext'
import GlobalContext from '../../context/GlobalContext'
import Search from '../snippets/Search'
import NewSnippetModal from '../snippets/modals/NewSnippetModal'
import TagsModal from '../snippets/modals/TagsModal'

function Navbar() {
  const [darkTheme, setDarkTheme] = useState(true)

  const { user } = useContext(AuthContext)
  const { logoutUser } = useContext(UserContext)
  const {
    setSnippets,
    snippetRef,
    setSnippetRef,
    editWarning,
    setEditWarning,
  } = useContext(SnippetContext)
  const { setAppTheme } = useContext(GlobalContext)

  const navigate = useNavigate()

  const scrollToRef = (snippetRef) => {
    window.scrollTo(0, snippetRef.current.offsetTop - 130)
  }

  const closeEditorHandler = () => {
    setSnippetRef(null)
    setEditWarning(false)
  }

  const checkEditorStatusBeforeLogOut = (e) => {
    if (
      window.confirm(
        'You are editing a snippet, are you sure you want to discard any change?',
      )
    ) {
      logoutUser()
      setSnippets([])
      navigate('/')
      closeEditorHandler()
    } else {
      scrollToRef(snippetRef)
    }
  }

  const preventPathChangeIfEditorIsOpen = (e) => {
    if (snippetRef) {
      e.preventDefault()
      scrollToRef(snippetRef)
      window.alert(
        'You are editing a snippet. Please save or discard changes before navigating away.',
      )
    }
  }

  const changeTheme = () => {
    setDarkTheme(!darkTheme)
    if (darkTheme) {
      document.documentElement.setAttribute('data-theme', 'light')
      setAppTheme('light')
    } else {
      document.documentElement.setAttribute('data-theme', 'dark')
      setAppTheme('dark')
    }
  }

  const [toggled, setToggled] = useState(false)

  const toggleMenu = () => {
    setToggled(!toggled)
  }

  const logoutUserHandler = (e) => {
    if (snippetRef) {
      checkEditorStatusBeforeLogOut(e)
    } else {
      logoutUser()
      setSnippets([])
      navigate('/')
      closeEditorHandler()
    }
  }

  return (
    <nav className="fixed top-0 left-0 z-50 flex flex-col w-full px-0 pt-4 pb-0 shadow-lg bg-neutral text-neutral-content">
      <div className="container flex justify-between mx-auto mb-4">
        <div className="flex-none px-2 mx-2 ">
          <Link
            to="/"
            onClick={preventPathChangeIfEditorIsOpen}
            className="text-lg font-bold align-middle "
          >
            <FaCode className="inline pr-2 text-3xl" />
          </Link>
        </div>
        {user && (
          <div className="flex gap-4">
            <Search />
            <div
              className="inline ml-8 tooltip tooltip-bottom"
              data-tip={'Create new snippet'}
            >
              <NewSnippetModal />
            </div>
            <div
              className="inline tooltip tooltip-bottom"
              data-tip={'Tags editor'}
            >
              <TagsModal />
            </div>
          </div>
        )}
        <div className="flex-1 px-2 mx-2 ">
          {/* Desktop menu */}
          <div className="flex justify-end gap-1">
            <div className="hidden gap-2 md:flex">
              {!user && (
                <NavLink to="/" className="btn btn-ghost btn-sm rounded-btn">
                  Home
                </NavLink>
              )}

              {/* Snippet editor warning (if snippet in editing mode) */}
              <div
                className="inline tooltip tooltip-left"
                data-tip={'Snippet in editor mode'}
              >
                {editWarning && (
                  <MdWarningAmber
                    className="mr-4 text-3xl cursor-pointer text-warning"
                    onClick={() => scrollToRef(snippetRef)}
                  />
                )}
              </div>
              {user && (
                <NavLink
                  to="/snippets"
                  className="btn btn-ghost btn-sm rounded-btn"
                >
                  Snippets
                </NavLink>
              )}
              <NavLink
                to="/about"
                onClick={preventPathChangeIfEditorIsOpen}
                className="btn btn-ghost btn-sm rounded-btn"
              >
                About
              </NavLink>
              {user && (
                <button
                  onClick={logoutUserHandler}
                  className="btn btn-ghost btn-sm rounded-btn"
                >
                  Log Out
                </button>
              )}
              {user && <p className="mx-2 mt-1 ">Hello {user.name}</p>}
              <button
                onClick={changeTheme}
                className="text-xl btn btn-ghost btn-sm rounded-btn"
              >
                {darkTheme ? <FaSun /> : <FaMoon />}
              </button>
            </div>

            {/* mobile button */}
            <div className="flex items-center md:hidden">
              <button onClick={toggleMenu}>
                {!toggled ? (
                  <FaBars className="text-3xl" />
                ) : (
                  <CgClose className="mt-2 text-3xl" />
                )}
              </button>
            </div>
          </div>

          {/* mobile menu */}
          <div className={toggled ? ' block md:hidden' : 'hidden'}>
            <div className="flex flex-col items-center gap-2">
              {!user && (
                <NavLink to="/" className="btn btn-ghost btn-sm rounded-btn">
                  Home
                </NavLink>
              )}

              {/* Snippet editor warning (if snippet in editing mode) */}
              <div
                className="inline tooltip tooltip-left"
                data-tip={'Snippet in editor mode'}
              >
                {editWarning && (
                  <MdWarningAmber className="mr-4 text-3xl cursor-pointer text-warning" />
                )}
              </div>
              {user && (
                <NavLink
                  to="/snippets"
                  className="btn btn-ghost btn-sm rounded-btn"
                >
                  Snippets
                </NavLink>
              )}
              <NavLink
                to="/about"
                onClick={preventPathChangeIfEditorIsOpen}
                className="btn btn-ghost btn-sm rounded-btn"
              >
                About
              </NavLink>
              {user && (
                <button
                  onClick={logoutUserHandler}
                  className="btn btn-ghost btn-sm rounded-btn"
                >
                  Log Out
                </button>
              )}
              {user && <p className="mx-2 mt-1 ">Hello {user.name}</p>}

              <button
                onClick={() => {
                  changeTheme()
                  toggleMenu()
                }}
                className="text-xl btn btn-ghost btn-sm rounded-btn"
              >
                {darkTheme ? <FaSun /> : <FaMoon />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
