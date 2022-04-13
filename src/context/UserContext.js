import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'
import { auth, db } from '../firebase/firebase'
import { addDoc, collection } from 'firebase/firestore'

const UserContext = createContext()

export const useUserContext = () => useContext(UserContext)

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    const unsubscribe = onAuthStateChanged(auth, (res) => {
      res ? setUser(res) : setUser(null)
      setError('')
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const registerUser = (email, name, password) => {
    setLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        return updateProfile(auth.currentUser, {
          displayName: name,
        })
      })
      .then((res) => console.log(res))
      .then(
        addDoc(collection(db, 'users'), {
          displayName: name,
          email: email,
        })
      )
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  const loginUser = (email, password) => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => console.log(res))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  }

  const logoutUser = () => {
    signOut(auth)
  }

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
  }

  const contextValue = {
    user,
    loading,
    error,
    registerUser,
    loginUser,
    signInWithGoogle,
    logoutUser,
    forgotPassword,
  }

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  )
}
