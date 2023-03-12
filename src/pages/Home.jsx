import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import Auth from '../components/layout/Auth'
import AuthContext from '../context/AuthContext'

function Home() {
  const { user } = useContext(AuthContext)

  return (
    <>
      {!user && <Auth />}
      {user && (
        <>
          <p className="mt-[200px]">More features are coming soon.</p>
          <p>
            You can go back to the {` `}
            <span>
              <NavLink to="/snippets" className="underline">
                Snippets
              </NavLink>
            </span>
            {` `} section
          </p>
        </>
      )}
    </>
  )
}

export default Home
