import { Suspense } from 'react'
import FilterByTag from '../components/snippets/FilterByTag'
import SnippetsList from '../components/snippets/SnippetsList'
import Spinner from '../components/layout/Spinner'
import { ScrollToTopButton } from '../helpers/ScrollToTopButton'

function Snippets() {
  return (
    <section className="">
      <Suspense fallback={<Spinner />}>
        <div className="grid grid-cols-4 gap-10">
          <section className="col-span-1 ">
            <div className="sticky top-[100px] left-0 ">
              <FilterByTag />
            </div>
          </section>
          <section className="col-span-3">
            <SnippetsList />
          </section>
        </div>
      </Suspense>
      <ScrollToTopButton />
    </section>
  )
}

export default Snippets
