import { Suspense, useContext, useEffect, useState } from "react";
import FilterByTag from "../components/snippets/FilterByTag";
import SnippetsList from "../components/snippets/SnippetsList";
import Spinner from "../components/layout/Spinner";
import { ScrollToTopButton } from "../helpers/ScrollToTopButton";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Snippets() {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId;

    const checkAuth = () => {
      if (!isLoading && !user) {
        navigate("/");
      }
    };

    if (user === null) {
      // Wait for a short duration to allow the auth state to load
      timeoutId = setTimeout(() => {
        setIsLoading(false);
        checkAuth();
      }, 1000);
    } else {
      setIsLoading(false);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [user, navigate, isLoading]);

  if (isLoading) {
    return <Spinner classes="mt-[100px]" />;
  }

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
  );
}

export default Snippets;
