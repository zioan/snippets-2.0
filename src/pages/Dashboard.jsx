import { useContext } from 'react';

import NewSnippet from '../components/snippets/NewSnippet';
import SnippetsList from '../components/snippets/SnippetsList';
import UserContext from '../context/UserContext';

function Dashboard() {
  const { user } = useContext(UserContext);

  return (
    <>
      <h2>Dashboard</h2>
      {user && <NewSnippet />}
      {user && <SnippetsList />}
    </>
  );
}

export default Dashboard;
