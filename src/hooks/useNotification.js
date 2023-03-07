import { useContext } from 'react'
import NotificationContext from '../context/NotificationContext'

function useNotification() {
  const { notificationArray, addNotification } = useContext(NotificationContext)

  const notificationHandler = (args) => {
    const newNotification = {
      type: args.type,
      message: args.message,
      createdAt: Date.now(),
    }
    addNotification(newNotification)
  }

  const modalStyle = {
    position: 'fixed',
    top: '4rem',
    right: '1rem',
    zIndex: '101',
  }

  const successMessageStyle = {
    color: '#06a31b',
    backgroundColor: '#ebebeb',
    padding: '0.5rem',
    margin: '0.5rem',
  }

  const errorMessageStyle = {
    color: '#f13413',
    backgroundColor: '#ebebeb',
    padding: '0.5rem',
    margin: '0.5rem',
  }

  const warningMessageStyle = {
    color: '#a87109',
    backgroundColor: '#ebebeb',
    padding: '0.5rem',
    margin: '0.5rem',
  }

  const displayNotification = () => {
    return (
      <div style={modalStyle}>
        {notificationArray.map((notification, index) => {
          return (
            <div key={index}>
              {notification.type === 'success' && (
                <p style={successMessageStyle}>{notification.message}</p>
              )}
              {notification.type === 'error' && (
                <p style={errorMessageStyle}>{notification.message}</p>
              )}
              {notification.type === 'warning' && (
                <p style={warningMessageStyle}>{notification.message}</p>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return { notificationHandler, displayNotification }
}

export default useNotification
