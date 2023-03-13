import { useState, useContext } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import { FaSun, FaMoon, FaBars } from 'react-icons/fa'
import { CgClose } from 'react-icons/cg'
import { MdWarningAmber } from 'react-icons/md'
import AuthContext from '../../context/AuthContext'
import SnippetContext from '../../context/SnippetContext'
import TagContext from '../../context/TagContext'
import GlobalContext from '../../context/GlobalContext'
import Search from '../snippets/Search'
import { ModalButton } from '../snippets/modals/Modal'
import { VscNewFile } from 'react-icons/vsc'
import { BsTags } from 'react-icons/bs'
import NewTag from '../snippets/NewTag'
import NewSnippet from '../snippets/NewSnippet'
import TagsEditor from '../snippets/TagsEditor'

function Navbar() {
  const [darkTheme, setDarkTheme] = useState(true)

  const { user } = useContext(AuthContext)
  const { logoutUser } = useContext(UserContext)
  const {
    setSnippets,
    searchedSnippetsHandler,
    snippetRef,
    setSnippetRef,
    editWarning,
    setEditWarning,
  } = useContext(SnippetContext)
  const { updateFilteredTag } = useContext(TagContext)
  const { setAppTheme } = useContext(GlobalContext)

  const navigate = useNavigate()
  const location = useLocation()

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
      searchedSnippetsHandler([])
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
      updateFilteredTag('')
      setSnippets([])
      searchedSnippetsHandler([])
      navigate('/')
      closeEditorHandler()
    }
  }

  return (
    <nav className="fixed top-0 left-0 z-50 flex flex-col w-full px-0 pt-4 pb-0 shadow-lg bg-neutral text-neutral-content">
      <div className="container flex justify-between mx-auto mb-4">
        {user && location.pathname === '/snippets' ? (
          <div className="flex gap-4">
            <Search />
            <div
              className="inline ml-3 tooltip tooltip-bottom"
              data-tip={'Create new snippet'}
            >
              {/* New Snippet Modal */}
              <ModalButton
                title={<VscNewFile className="text-2xl fill-accent" />}
              >
                <h3 className="mb-8 text-2xl text-center ">Add new snippet</h3>
                <NewTag />
                <NewSnippet />
              </ModalButton>
            </div>
            <div
              className="inline tooltip tooltip-bottom"
              data-tip={'Tags editor'}
            >
              {/* Tags editor modal */}
              <ModalButton title={<BsTags className="text-2xl fill-accent" />}>
                <h3 className="mb-8 text-2xl text-center ">Tags Editor</h3>
                <NewTag />

                <h4>Click tags to delete</h4>
                <div className="flex flex-wrap gap-2 mt-4 ">
                  <TagsEditor />
                </div>
              </ModalButton>
            </div>
          </div>
        ) : null}
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
