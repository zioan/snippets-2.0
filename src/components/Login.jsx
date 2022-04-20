import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import AuthContext from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, error } = useContext(UserContext);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      console.log(err);
    }
    // console.log('user:', user);
    // if (user !== null) {
    //   console.log(user, '22');
    // }
    // navigate('/dashboard');
  };

  // let status = user !== null ? false : true;

  // useEffect(() => {
  //   navigate('/dashboard');
  //   console.log(user, '22');
  // }, [status]);

  return (
    <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
      <form onSubmit={loginHandler}>
        <div className='card-body'>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Email</span>
            </label>
            <input
              type='text'
              placeholder='email'
              className='input input-bordered'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Password</span>
            </label>
            <input
              type='password'
              placeholder='password'
              className='input input-bordered'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className='label'>
              <a href='/' className='label-text-alt link link-hover'>
                Forgot password?
              </a>
            </label>
          </div>
          {error && <p className=' text-red-400'>{error}</p>}
          <div className='form-control mt-6'>
            <button type='submit' className='btn btn-primary'>
              Login
            </button>
          </div>

          {/* Errors */}
          {/* {error && <p className=' text-red-400'>{error}</p>} */}
        </div>
      </form>

      {/* Auth methods */}
      {/* <div className='flex flex-col w-full'>
        <div className='divider mb-10'>or</div>
        <button
          className='login-with-google-btn btn btn-primary mx-8 mb-12'
          onClick={signInWithGoogleHangler}
        >
          Sign in with Google
        </button>
      </div> */}
    </div>
  );
}

export default Login;
