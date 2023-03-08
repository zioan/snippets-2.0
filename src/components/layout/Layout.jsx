import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useLocation } from 'react-router-dom'

function Layout({ children }) {
  const location = useLocation()
  const isSnippetsRoute = location.pathname === '/snippets'
  return (
    <main className="flex flex-col w-screen h-screen">
      <Navbar />
      <div className="flex flex-row items-center justify-between">
        {isSnippetsRoute && <Sidebar />}
        <div className="self-start px-10 mx-auto">{children}</div>
      </div>
    </main>
  )
}

export default Layout
