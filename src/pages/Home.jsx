import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Auth from '../components/layout/Auth'
import AuthContext from '../context/AuthContext'
import waitForServerResponse from '../helpers/checkForUser'

function Home() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    waitForServerResponse().then(
      (response) => response && navigate('/snippets'),
    )
  }, [])

  return <>{!user && <Auth />}</>
}

export default Home
