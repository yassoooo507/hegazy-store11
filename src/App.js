import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Shop from './components/Shop';

function App() {
  const isLoggedIn = !!localStorage.getItem('hegazy_logged_in');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <Signup />} />
        <Route path="/*" element={isLoggedIn ? <Shop /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
