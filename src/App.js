import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Dashboard from './pages/Dashboard';

axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <div className='flex flex-col justify-between  min-h-screen'>
        {/* <div className='min-h-screen'> */}
        <Navbar className='row-start-1' />
        <main className=' container mx-auto px-3 pb-12 relative'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/about' element={<About />} />

            <Route path='/notfound' element={<NotFound />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
