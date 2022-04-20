import { useContext } from 'react';

import NewSnippet from '../components/snippets/NewSnippet';
import SnippetsList from '../components/snippets/SnippetsList';
import AuthContext from '../context/AuthContext';
import UserContext from '../context/UserContext';

function Dashboard() {
  // const { user } = useContext(UserContext);
  const { user } = useContext(AuthContext);

  return (
    <>
      <h2>Dashboard</h2>
      {/* <h1>{user.name}</h1> */}
      {user && <NewSnippet />}
      {user && <SnippetsList />}
    </>
  );
}

export default Dashboard;
