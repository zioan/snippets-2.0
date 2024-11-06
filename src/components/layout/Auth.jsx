import { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Login from "../Login";
import Register from "../Register";

function Auth() {
  const [authToggle, setAuthToggle] = useState(true);
  const { login, user, getUser } = useContext(UserContext);
  const navigate = useNavigate();

  const changeAuthMode = () => {
    setAuthToggle(!authToggle);
  };

  const testAccountLogin = async () => {
    const email = "john@test.com";
    const password = "asdasd123123";
    try {
      await login(email, password)
        .then(() => getUser())
        .then(() => navigate("/snippets"))
        .then(() => console.log("Logged in as demo account"));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // Layout for authentication if user is not logged in
    <div className="py-20 hero bg-base-200 mt-[150px]">
      {!user && (
        <div className="flex-col hero-content lg:gap-20 lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            {/* Demo account */}
            <h1 className="mb-4 text-3xl lg:mb-10">
              Click{" "}
              <span className="underline cursor-pointer " onClick={() => testAccountLogin()}>
                HERE
              </span>{" "}
              for demo account test.
            </h1>

            {/* Switch text for components login / register */}
            <h2 className="mb-8 text-5xl font-bold ">{authToggle ? "Login" : "Register"}</h2>
            <p className="mb-4 lg:mb-6">
              Snippets is a web application designed to save and share code snippets. This is still a work in progress, with features and improvements
              added regularly. Check the demo account for a quick overview and the about page for more information.
            </p>
            <p className="mb-4 lg:mb-0">
              {authToggle ? "No Account? " : "Already have an account? "}

              {/* Switch components login / register */}
              <button onClick={changeAuthMode} className="text-xl underline ">
                {authToggle ? "Register Now!" : "Login instead!"}
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
