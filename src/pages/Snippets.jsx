import { Suspense } from 'react'

import FilterByTag from '../components/snippets/FilterByTag'
import SnippetsList from '../components/snippets/SnippetsList'
import Spinner from '../components/layout/Spinner'
import NewSnippetModal from '../components/snippets/modals/NewSnippetModal'
import TagsModal from '../components/snippets/modals/TagsModal'

function Snippets() {
  return (
    <section>
      <Suspense fallback={<Spinner />}>
        <div className=" hidden bg-base-100  top-[64px] z-50 p-4 md:flex flex-col w-full items-center fixed left-0">
          <FilterByTag />
        </div>
        <SnippetsList />
        <NewSnippetModal />
        <TagsModal />
      </Suspense>
    </section>
  )
}

export default Snippets
