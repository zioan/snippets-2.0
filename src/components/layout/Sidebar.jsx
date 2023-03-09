import React from 'react'
import Modal from '../../helpers/Modal'
import FilterByTag from '../snippets/FilterByTag'
import SnippetModal from '../snippets/modals/SnippetModal'
import TagsModal from '../snippets/modals/TagsModal'
import NewSnippet from '../snippets/NewSnippet'
import NewTag from '../snippets/NewTag'
import Search from '../snippets/Search'
import TagsEditor from '../snippets/TagsEditor'

function Sidebar() {
  const footerYear = new Date().getFullYear()

  return (
    <div className="w-[400px] h-[calc(100vh-64px)] border-r-2 p-4 self-start top-[64px] sticky flex flex-col justify-between">
      <div className="mt-10">
        <Modal buttonName={'Create new Snippet'}>
          <NewTag />
          <NewSnippet />
        </Modal>
        <Modal buttonName={'Tags Editor'}>
          <>
            <h3 className="mb-8 text-2xl text-center ">Tags Editor</h3>
            <NewTag />

            <h4>Click tags to delete</h4>
            <div className="flex flex-wrap gap-2 mt-4 ">
              <TagsEditor />
            </div>
          </>
        </Modal>
        <SnippetModal />
        <TagsModal />
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
