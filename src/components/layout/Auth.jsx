import { useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import Login from '../Login';
import Register from '../Register';

function Auth() {
  const [authToggle, setAuthToggle] = useState(true);
  const { loginUser, user } = useContext(UserContext);

  const changeAuthMode = () => {
    setAuthToggle(!authToggle);
  };

  const testAccountLogin = async () => {
    const email = 'john@test.com';
    const password = 'asdasd123123';
    try {
      await loginUser(email, password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='hero py-20 bg-base-200'>
      {!user && (
        <div className='hero-content flex-col lg:gap-20 lg:flex-row-reverse'>
          <div className='text-center lg:text-left'>
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
            <h2 className=' text-5xl font-bold mb-8'>
              {authToggle ? 'Login' : 'Register'}
            </h2>
            <p className=' mb-4 lg:mb-6'>
              Snippets is a web application that allows managing and securely
              storing your coding snippets.
            </p>
            <p className='mb-4 lg:mb-0'>
              {authToggle ? 'No Account? ' : 'Already have an account? '}
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
