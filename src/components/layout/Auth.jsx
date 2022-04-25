import { useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import Login from '../Login';
import Register from '../Register';

function Auth() {
  const [authToggle, setAuthToggle] = useState(true);
  const { login, user } = useContext(UserContext);

  const changeAuthMode = () => {
    setAuthToggle(!authToggle);
  };

  const testAccountLogin = async () => {
    const email = 'john@test.com';
    const password = 'asdasd123123';
    try {
      await login(email, password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // Layout for authentication if user is not logged in
    <div className='hero py-20 bg-base-200'>
      {!user && (
        <div className='hero-content flex-col lg:gap-20 lg:flex-row-reverse'>
          <div className='text-center lg:text-left'>
            {/* Demo account */}
            <h1 className='text-3xl mb-4 lg:mb-10'>
              Click{' '}
              <span
                className=' underline cursor-pointer'
                onClick={() => testAccountLogin()}
              >
                HERE
              </span>{' '}
              for demo account.
            </h1>

            {/* Switch text for components login / register */}
            <h2 className=' text-5xl font-bold mb-8'>
              {authToggle ? 'Login' : 'Register'}
            </h2>
            <p className=' mb-4 lg:mb-6'>
              Snippets is a web application designed to store code snippets,
              fully responsive but designed mainly for large screens.
            </p>
            <p className='mb-4 lg:mb-0'>
              {authToggle ? 'No Account? ' : 'Already have an account? '}

              {/* Switch components login / register */}
              <button onClick={changeAuthMode} className=' underline text-xl'>
                {authToggle ? 'Register Now!' : 'Login instead!'}
              </button>
            </p>
          </div>

          {authToggle ? <Login /> : <Register />}
        </div>
      )}
    </div>
  );
}

export default Auth;
