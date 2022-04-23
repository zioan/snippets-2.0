import { useState, useContext } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { FaCode, FaSun, FaMoon, FaBars } from 'react-icons/fa';
import { CgClose } from 'react-icons/cg';
import { MdWarningAmber } from 'react-icons/md';
import AuthContext from '../../context/AuthContext';
import FilterByTag from '../snippets/FilterByTag';
import SnippetContext from '../../context/SnippetContext';
import TagContext from '../../context/TagContext';

function Navbar() {
  const [theme, setTheme] = useState(true);

  const { logoutUser } = useContext(UserContext);
  const { user } = useContext(AuthContext);
  const { editWarning } = useContext(SnippetContext);
  const { updateFilteredTag } = useContext(TagContext);

  const navigate = useNavigate();

  const changeTheme = () => {
    setTheme(!theme);
    theme && document.documentElement.setAttribute('data-theme', 'light');
    !theme && document.documentElement.setAttribute('data-theme', 'dark');
  };

  const [toggled, setToggled] = useState(false);

  const toggleMenu = () => {
    setToggled(!toggled);
  };

  const logoutUserHandler = () => {
    logoutUser();
    navigate('/');
  };

  // Sort by tag
  const sortByTag = (tag) => {
    updateFilteredTag(tag);
  };

  return (
    <nav className=' navbar flex flex-col shadow-lg bg-neutral text-neutral-content sticky top-0 left-0 z-50 pt-4 pb-0 px-0'>
      <div className='container mx-auto flex justify-between mb-4'>
        <div className='flex-none px-2 mx-2 '>
          <Link to='/' className=' text-lg font-bold align-middle'>
            <FaCode className='inline pr-2 text-3xl' />
            Snippets
          </Link>
        </div>
        <div className='flex-1 px-2 mx-2 '>
          {/* Desktop menu */}
          <div className='flex justify-end gap-1'>
            <div className=' hidden md:flex gap-2'>
              {!user && (
                <NavLink to='/' className='btn btn-ghost btn-sm rounded-btn'>
                  Home
                </NavLink>
              )}

              {/* Snippet editor warning (if snippet in editing mode) */}
              <div
                className=' inline tooltip tooltip-left'
                data-tip={'Snippet in editor mode'}
              >
                {editWarning && (
                  <MdWarningAmber className=' text-3xl text-warning mr-4 cursor-pointer' />
                )}
              </div>
              {user && (
                <NavLink
                  to='/dashboard'
                  className='btn btn-ghost btn-sm rounded-btn'
                >
                  Dashboard
                </NavLink>
              )}
              <NavLink to='/about' className='btn btn-ghost btn-sm rounded-btn'>
                About
              </NavLink>
              {user && (
                <button
                  onClick={logoutUserHandler}
                  className='btn btn-ghost btn-sm rounded-btn'
                >
                  Log Out
                </button>
              )}
              {user && <p className=' mt-1 mx-2'>Hello {user.name}</p>}
              <button
                onClick={changeTheme}
                className='btn btn-ghost btn-sm rounded-btn text-xl'
              >
                {theme ? <FaMoon /> : <FaSun />}
              </button>
            </div>

            {/* mobile button */}
            <div className='flex items-center md:hidden'>
              <button onClick={toggleMenu}>
                {!toggled ? (
                  <FaBars className='text-3xl' />
                ) : (
                  <CgClose className='text-3xl mt-2' />
                )}
              </button>
            </div>
          </div>

          {/* mobile menu */}
          <div className={toggled ? ' block md:hidden' : 'hidden'}>
            <div className='flex flex-col gap-2 items-center'>
              {!user && (
                <NavLink to='/' className='btn btn-ghost btn-sm rounded-btn'>
                  Home
                </NavLink>
              )}

              {/* Snippet editor warning (if snippet in editing mode) */}
              <div
                className=' inline tooltip tooltip-left'
                data-tip={'Snippet in editor mode'}
              >
                {editWarning && (
                  <MdWarningAmber className=' text-3xl text-warning mr-4 cursor-pointer' />
                )}
              </div>
              {user && (
                <NavLink
                  to='/dashboard'
                  className='btn btn-ghost btn-sm rounded-btn'
                >
                  Dashboard
                </NavLink>
              )}
              <NavLink to='/about' className='btn btn-ghost btn-sm rounded-btn'>
                About
              </NavLink>
              {user && (
                <button
                  onClick={logoutUserHandler}
                  className='btn btn-ghost btn-sm rounded-btn'
                >
                  Log Out
                </button>
              )}
              {user && <p className=' mt-1 mx-2'>Hello {user.name}</p>}

              <button
                onClick={() => {
                  changeTheme();
                  toggleMenu();
                }}
                className='btn btn-ghost btn-sm rounded-btn text-xl'
              >
                {theme ? <FaMoon /> : <FaSun />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Filter snippets by tag */}
      <div className=' hidden bg-base-100  top-[64px] z-50 p-4 md:flex flex-col w-full items-center'>
        <FilterByTag sortByTag={sortByTag} />
      </div>
    </nav>
  );
}

export default Navbar;
