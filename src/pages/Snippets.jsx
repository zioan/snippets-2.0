import { Suspense } from 'react'
import SnippetsList from '../components/snippets/SnippetsList'
import Spinner from '../components/layout/Spinner'

function Snippets() {
  return (
    <section className="self-center">
      <Suspense fallback={<Spinner />}>
        <SnippetsList />
      </Suspense>
    </section>
  )
}

export default Snippets
