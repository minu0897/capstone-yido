import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './pages/Login/AuthContext';
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
import VideoPlayer from './pages/VideoPlayer/VideoPlayer';
import reportWebVitals from './reportWebVitals';
import RegisterVideo from './pages/RegisterVideo/RegisterVideo';
import WriteCommunity from './pages/WriteCommunity/WriteCommunity';
import Post from './pages/Community/Post';
import UserProfile from './pages/UserProfile/UserProfile';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <div className="container"> 
    <AuthProvider>  
      <BrowserRouter>
        <Header />
        <Navigation />
        <Routes>
          <Route path='/UserProfile' element={<UserProfile/>}/>
          <Route path='/' element={<Home/>} />
          <Route path='/Community' element={<Community />} />
          <Route path='/Note' element={<Note />} />
          <Route path='/Recommand' element={<Recommand />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/videoplayer' element={<VideoPlayer />} />
          <Route path='/RegisterVideo' element={<RegisterVideo/>}/>
          <Route path='/WriteCommunity' element={<WriteCommunity/>}/>
          <Route path='/api/post/:postId' element={<Post />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  </div>
);

reportWebVitals();
