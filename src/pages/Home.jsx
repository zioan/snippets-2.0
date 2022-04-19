import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../components/layout/Auth';
import Spinner from '../components/layout/Spinner';
import UserContext from '../context/UserContext';

function Home() {
  const { user, loading, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      {loading && <Spinner />}
      {user && (
        <section>
          <h2 className=' text-3xl mb-6'>
            You are logged in as {user.displayName}.
          </h2>
          <p>
            You can go to your{' '}
            <button
              onClick={() => navigate('/dashboard')}
              className=' underline'
            >
              dashboard
            </button>
            .
          </p>
          <p>
            Need to go? Log out{' '}
            <button onClick={() => logoutUser()} className=' underline'>
              here
            </button>
            .
          </p>
        </section>
      )}
      {!user && <Auth />}
    </>
  );
}

export default Home;
