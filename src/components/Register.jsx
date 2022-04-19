import { useState, useContext } from 'react';
import UserContext from '../context/UserContext';

function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const { registerUser, error, user, signInWithGoogle } =
    useContext(UserContext);

  const registerUserHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setShowError(true);
      return;
    } else {
      setShowError(false);
    }
    try {
      await registerUser(email, name, password);
    } catch (err) {
      console.log(err);
    }
  };

  const signInWithGoogleHangler = () => {
    signInWithGoogle();
  };

  return (
    <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
      <form onSubmit={registerUserHandler}>
        <div className='card-body'>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Name</span>
            </label>
            <input
              type='text'
              placeholder='name'
              required
              className='input input-bordered'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Email</span>
            </label>
            <input
              type='email'
              placeholder='email'
              required
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
              required
              className='input input-bordered'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Confirm Password</span>
            </label>
            <input
              type='password'
              placeholder='confirm password'
              required
              className='input input-bordered'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Errors */}
          {showError && <p className=' text-red-400'>Password do not match!</p>}
          {error && <p className=' text-red-400'>{error}</p>}

          <div className='form-control mt-6'>
            <button type='submit' className='btn btn-primary'>
              Register
            </button>
          </div>
        </div>
      </form>
      {/* Auth methods */}
      <div className='flex flex-col w-full'>
        <div className='divider mb-10'>or</div>
        <button
          className='login-with-google-btn btn btn-primary mx-8 mb-12'
          onClick={signInWithGoogleHangler}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Register;
