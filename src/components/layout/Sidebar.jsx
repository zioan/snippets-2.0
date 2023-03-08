import React from 'react'
import FilterByTag from '../snippets/FilterByTag'
import Search from '../snippets/Search'

function Sidebar() {
  const footerYear = new Date().getFullYear()

  return (
    <div className="w-[400px] h-[calc(100vh-64px)] border-r-2 p-4 self-start top-[64px] sticky flex flex-col justify-between">
      <div>
        <FilterByTag />
        <Search />
      </div>
      <footer className="text-sm text-center text-primary-content">
        <p>
          Copyright &copy; {footerYear}. Made by{' '}
          <a
            className="underline "
            href="https://ioanzaharia.com"
            target="blank"
          >
            Ioan Zaharia
          </a>
        </p>
      </footer>
    </div>
  )
}

export default Sidebar
