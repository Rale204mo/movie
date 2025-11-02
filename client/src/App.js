import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Reviews from './pages/Reviews';
import AddReview from './pages/AddReview';
import Profile from './pages/Profile';
import About from './pages/About';
import EditReview from './pages/EditReview';
import Movies from './pages/Movies';
import { signInWithProvider, googleProvider, facebookProvider } from './firebase';

function Sidebar(){
  return (<div className="sidebar p-3">
    <h4>Movie Review Platform</h4><hr/>
    <ul className="nav flex-column">
      <li><NavLink to="/" className="nav-link">Home</NavLink></li>
      <li><NavLink to="/reviews" className="nav-link">Reviews</NavLink></li>
      <li><NavLink to="/add" className="nav-link">Add Review</NavLink></li>
      <li><NavLink to="/profile" className="nav-link">Profile</NavLink></li>
      <li><NavLink to="/about" className="nav-link">About</NavLink></li>
      <li><NavLink to="/movie" className="nav-link">Movie</NavLink></li>
    </ul>
    <div className="mt-3">
  <button
    className="btn btn-outline-light btn-sm me-2"
    onClick={async () => {
      try {
        await signInWithProvider(googleProvider);
      } catch (err) {
        console.error('Google Sign-In Error:', err);
        alert('Google sign-in failed. Please check popup settings or try again.');
      }
    }}
  >
    Google
  </button>

  <button
    className="btn btn-outline-light btn-sm"
    onClick={async () => {
      try {
        await signInWithProvider(facebookProvider);
      } catch (err) {
        console.error('Facebook Sign-In Error:', err);
        alert('Facebook sign-in failed. Please check popup settings or try again.');
      }
    }}
  >
    Facebook
  </button>
</div>

  </div>);
}

export default function App(){
  return (<BrowserRouter>
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-lg-2 p-0"><Sidebar/></div>
        <main className="col p-3">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/reviews" element={<Reviews/>}/>
            <Route path="/add" element={<AddReview/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/edit/:id" element={<EditReview/>}/>
            <Route path="/movie" element={<Movies/>}/>
          </Routes>
        </main>
      </div>
    </div>
  </BrowserRouter>);
}