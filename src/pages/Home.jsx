import { useContext } from 'react'
import Auth from '../components/layout/Auth'
import AuthContext from '../context/AuthContext'

function Home() {
  const { user } = useContext(AuthContext)

  return (
    <>
      {!user && <Auth />}
      {user && <p className="mt-[200px]">More features are coming soon.</p>}
    </>
  )
}

export default Home
