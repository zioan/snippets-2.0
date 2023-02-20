import { useContext } from 'react'
import Auth from '../components/layout/Auth'
import AuthContext from '../context/AuthContext'

function Home() {
  const { user } = useContext(AuthContext)

  return <>{!user && <Auth />}</>
}

export default Home
