import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './components/common/header/Header';
import Navigation from './components/common/navigation/Navigation';
import Home from './pages/Home/Home';
import Note from './pages/Note/Note';
import Community from './pages/Community/Community';
import Recommand from './pages/Recommand/Recommand';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <div class="container">
    <BrowserRouter>
      <Header />
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/Community' element={<Community />} />
        <Route path='/Note' element={<Note />} />
        <Route path='/Recommand' element={<Recommand />} />
      </Routes>
    </BrowserRouter>
  </div>
);

reportWebVitals();