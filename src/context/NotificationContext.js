import { createContext, useState, useEffect } from 'react'

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notificationArray, setNotificationArray] = useState([])

  const notificationLifespan = 3000 //time for active notification (ms)

  const addNotification = (newNotification) => {
    setNotificationArray((prevState) => [...prevState, newNotification])
    console.log('notification triggered')
    setTimeout(() => {
      setNotificationArray((prevState) =>
        prevState.filter(
          (notification) =>
            Date.now() - notificationLifespan <= notification.createdAt,
        ),
      )
    }, notificationLifespan)
  }

  useEffect(() => {
    // cleanup function to clear the timeout when the component unmounts
    return () =>
      notificationArray.forEach((notification) =>
        clearTimeout(notification.timeoutId),
      )
  }, [notificationArray])

  return (
    <NotificationContext.Provider
      value={{ notificationArray, addNotification }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
