import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import server from '../server'

const AuthContext = createContext()

function AuthProvider(props) {
  const [user, setUser] = useState(null)

  async function getUser() {
    try {
      const userRes = await axios.get(`${server}/users/loggedin`)
      setUser(userRes.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, getUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
export { AuthProvider }
