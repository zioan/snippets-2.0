import { useContext } from 'react';
import UserContext from '../context/UserContext';

function About() {
  const { registerUser, error, user, logoutUser } = useContext(UserContext);

  console.log(user);
  // console.log(user.displayName)
  return (
    <>
      <h2>About</h2>
      <button onClick={() => logoutUser()}>LogOut</button>
      <br />
      {user && 'hi '}
      {user && user.displayName}
    </>
  );
}

export default About;
