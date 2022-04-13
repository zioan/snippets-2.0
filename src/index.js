import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { UserContextProvider } from './context/UserContext'
import { SnippetContextProvider } from './context/SnippetContext'
import './index.css'

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

root.render(
  <UserContextProvider>
    <SnippetContextProvider>
      <App />
    </SnippetContextProvider>
  </UserContextProvider>
)
