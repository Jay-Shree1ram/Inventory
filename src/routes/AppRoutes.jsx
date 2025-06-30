import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import LoginSignupPage from '../pages/LoginSignupPage.jsx';
import InventoryDashboard from '../components/Inventory/dashboard.js';
import ResourceForm from '../components/Resource/resourcecreate.js';
import ResourceList from '../components/Resource/resourcelist.js';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<LoginSignupPage/>} />
      <Route path="/inventory" element={<InventoryDashboard/>} />
      <Route path ="/resource/create" element={<ResourceForm/>} />
      <Route path ="/resource/list" element={<ResourceList/>} />
    
    </Routes>
  );
};

export default AppRoutes;
