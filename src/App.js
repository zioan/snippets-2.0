import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Snippets from "./pages/Snippets";
import SharedSnippet from "./components/snippets/SharedSnippet";
import { useContext, useEffect } from "react";
import TagContext from "./context/TagContext";
import SnippetContext from "./context/SnippetContext";
import AuthContext from "./context/AuthContext";
import useNotification from "./hooks/useNotification";

axios.defaults.withCredentials = true;

function App() {
  const { user } = useContext(AuthContext);
  const { getSnippets } = useContext(SnippetContext);
  const { getTags } = useContext(TagContext);
  const { displayNotification } = useNotification();

  useEffect(() => {
    if (user) {
      getSnippets();
      getTags();
      console.log("User logged in test 3");
    }
  }, [user]);

  return (
    <Router>
      <main className="flex flex-col justify-between min-h-screen">
        <Navbar className="" />
        <div className="container mx-auto">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/snippets" element={<Snippets />} />
            <Route path="/about" element={<About />} />
            <Route path="/shared/:user_name/:user_id/:snippet_id" element={<SharedSnippet />} />

            <Route path="/notfound" element={<NotFound />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
          {displayNotification()}
        </div>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
