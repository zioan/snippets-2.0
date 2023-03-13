import { Suspense, useContext, useEffect } from 'react'
import FilterByTag from '../components/snippets/FilterByTag'
import SnippetsList from '../components/snippets/SnippetsList'
import Spinner from '../components/layout/Spinner'
import { ScrollToTopButton } from '../helpers/ScrollToTopButton'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Snippets() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const redirectToHome = async () => {
    if (!user) {
      navigate('/')
    }
  }

  useEffect(() => {
    redirectToHome()
  }, [])

  return (
    <section className="">
      <Suspense fallback={<Spinner />}>
        {user && (
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
        )}
      </Suspense>
      <ScrollToTopButton />
    </section>
  )
}

export default Snippets
