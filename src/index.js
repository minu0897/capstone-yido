import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';
import Navigation from './components/common/navigation/Navigation';
import Home from './pages/Home/Home';
import Note from './pages/Note/Note';
import Community from './pages/Community/Community';
import Recommand from './pages/Recommand/Recommand';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <div class="container">
    <BrowserRouter>
      <Header />
      <Navigation />
      <Routes>
        <Route path='/' element={<Home/>} /> 
        <Route path='/Community' element={<Community />} />
        <Route path='/Note' element={<Note />} />
        <Route path='/Recommand' element={<Recommand />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Login' element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </div>
);


reportWebVitals();
