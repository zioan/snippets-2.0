import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Auth from '../components/layout/Auth'
import AuthContext from '../context/AuthContext'

function Home() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    user ? navigate('/snippets') : navigate('/')
  }, [user, navigate])

  return (
    <>
      {/* {loading && <Spinner />} */}

      {/* Load Auth layout component if no user / guest */}
      {!user && <Auth />}
    </>
  )
}

export default Home
