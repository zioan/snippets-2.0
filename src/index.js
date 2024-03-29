import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { UserProvider } from './context/UserContext'
import { SnippetProvider } from './context/SnippetContext'
import { TagProvider } from './context/TagContext'
import { GlobalProvider } from './context/GlobalContext'
import { NotificationProvider } from './context/NotificationContext'
import './index.scss'

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

root.render(
  <AuthProvider>
    <NotificationProvider>
      <GlobalProvider>
        <UserProvider>
          <SnippetProvider>
            <TagProvider>
              <App />
            </TagProvider>
          </SnippetProvider>
        </UserProvider>
      </GlobalProvider>
    </NotificationProvider>
  </AuthProvider>,
)
