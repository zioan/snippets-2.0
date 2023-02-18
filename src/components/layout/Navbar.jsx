import { useState, useContext } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import { FaCode, FaSun, FaMoon, FaBars } from 'react-icons/fa'
import { CgClose } from 'react-icons/cg'
import { MdWarningAmber } from 'react-icons/md'
import AuthContext from '../../context/AuthContext'
import FilterByTag from '../snippets/FilterByTag'
import SnippetContext from '../../context/SnippetContext'
import TagContext from '../../context/TagContext'

function Navbar() {
  const [theme, setTheme] = useState(true)

  const { logoutUser } = useContext(UserContext)
  const { user } = useContext(AuthContext)
  const { editWarning } = useContext(SnippetContext)
  const { updateFilteredTag } = useContext(TagContext)

  const navigate = useNavigate()

  const changeTheme = () => {
    setTheme(!theme)
    theme && document.documentElement.setAttribute('data-theme', 'light')
    !theme && document.documentElement.setAttribute('data-theme', 'dark')
  }

  const [toggled, setToggled] = useState(false)

  const toggleMenu = () => {
    setToggled(!toggled)
  }

  const logoutUserHandler = () => {
    logoutUser()
    navigate('/')
  }

  // Sort by tag
  const sortByTag = (tag) => {
    updateFilteredTag(tag)
  }

  return (
    <nav className="sticky top-0 left-0 z-50 flex flex-col px-0 pt-4 pb-0 shadow-lg navbar bg-neutral text-neutral-content">
      <div className="container flex justify-between mx-auto mb-4">
        <div className="flex-none px-2 mx-2 ">
          <Link to="/" className="text-lg font-bold align-middle ">
            <FaCode className="inline pr-2 text-3xl" />
            Snippets
          </Link>
        </div>
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
                  <MdWarningAmber className="mr-4 text-3xl cursor-pointer text-warning" />
                )}
              </div>
              {user && (
                <NavLink to="/" className="btn btn-ghost btn-sm rounded-btn">
                  Snippets
                </NavLink>
              )}
              <NavLink to="/about" className="btn btn-ghost btn-sm rounded-btn">
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
                {theme ? <FaMoon /> : <FaSun />}
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
              <NavLink to="/about" className="btn btn-ghost btn-sm rounded-btn">
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
                {theme ? <FaMoon /> : <FaSun />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Filter snippets by tag */}
      <div className=" hidden bg-base-100  top-[64px] z-50 p-4 md:flex flex-col w-full items-center">
        <FilterByTag sortByTag={sortByTag} />
      </div>
    </nav>
  )
}

export default Navbar
