import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import LoginSignupPage from '../pages/LoginSignupPage.jsx';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<LoginSignupPage/>} />
    
    </Routes>
  );
};

export default AppRoutes;
