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
        .then(() => navigate("/snippets"));
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
              Snippets is your personal code library - a modern web application designed to help developers organize, manage, and share code snippets
              efficiently. Create a searchable collection of your most-used code blocks, complete with syntax highlighting and smart tagging for quick
              retrieval. Optimized for desktop use, this tool focuses on providing the best code management experience on larger screens where
              developers do most of their work.
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
