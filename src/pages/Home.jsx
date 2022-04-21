import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../components/layout/Auth';
import Spinner from '../components/layout/Spinner';
import AuthContext from '../context/AuthContext';
import UserContext from '../context/UserContext';

function Home() {
  const { loading, logoutUser } = useContext(UserContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      {loading && <Spinner />}

      {/* If user is logged in */}
      {user && (
        <section>
          <h2 className=' text-3xl mb-6'>You are logged in as {user.name}.</h2>
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

      {/* Load Auth layout component if no user / guest */}
      {!user && <Auth />}
    </>
  );
}

export default Home;
