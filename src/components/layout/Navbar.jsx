import { useState, useContext } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { FaCode, FaSun, FaMoon, FaBars } from 'react-icons/fa';
import { CgClose } from 'react-icons/cg';

function Navbar() {
  const [theme, setTheme] = useState(true);

  const { user, logoutUser } = useContext(UserContext);
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

  return (
    <nav className=' navbar mb-12 shadow-lg bg-neutral text-neutral-content'>
      <div className='container mx-auto flex justify-between'>
        <div className='flex-none px-2 mx-2 fixed top-4 '>
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
              {user && <p className=' mt-1 mx-2'>Hello {user.displayName}</p>}
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
              <NavLink
                to='/'
                className='btn btn-ghost btn-sm rounded-btn py-2 px-4'
                onClick={toggleMenu}
              >
                Home
              </NavLink>
              <NavLink
                to='/about'
                className='btn btn-ghost btn-sm rounded-btn'
                onClick={toggleMenu}
              >
                About
              </NavLink>
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
    </nav>
  );
}

export default Navbar;
