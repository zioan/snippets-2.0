import { useContext } from 'react'
import { useUserContext } from '../context/UserContext'

function About() {
  const { registerUser, error, user, logoutUser } = useUserContext()

  console.log(user)
  // console.log(user.displayName)
  return (
    <>
      <h2>About</h2>
      <button onClick={() => logoutUser()}>LogOut</button>
      <br />
      {user && 'hi '}
      {user && user.displayName}
    </>
  )
}

export default About
