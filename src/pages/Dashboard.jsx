import { useContext } from 'react';
import { Link } from 'react-router-dom';
import NewSnippet from '../components/snippets/NewSnippet';
import NewTag from '../components/snippets/NewTag';
import SearchSnippet from '../components/snippets/SearchSnippet';
import SnippetsList from '../components/snippets/SnippetsList';
import AuthContext from '../context/AuthContext';

function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {!user && (
        <p className=' text-2xl'>
          You need to
          <Link className=' underline text-red-400 mx-2' to='/'>
            log in!
          </Link>
        </p>
      )}
      {user && (
        <main>
          <h2>Dashboard</h2>
          <SearchSnippet />
          <h3>Tags</h3>
          <NewTag />
          <h3>Snippets</h3>
          <NewSnippet />
          <SnippetsList />
        </main>
      )}
    </>
  );
}

export default Dashboard;
