import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import LoginSignupPage from '../pages/LoginSignupPage.jsx';
import InventoryDashboard from '../components/Inventory/dashboard.js';
import ResourceForm from '../components/Resource/resourcecreate.js';
import ResourceList from '../components/Resource/resourcelist.js';
import ResourceEdit from '../components/Resource/resourceedit.js';
import MasterClass from '../components/Master/masterclass.jsx';
import MasterType from '../components/Master/mastertype.jsx';
import MasterStatus from '../components/Master/masterstatus.jsx';
import PingCheck from '../pages/PingCheck';
import Dashboardpage from '../pages/Dashboardpage.jsx';
import EmployeeListPage from '../pages/EmployeeListPage.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<LoginSignupPage/>} />
      <Route path="/inventory" element={<InventoryDashboard/>} />
      <Route path ="/resource/create" element={<ResourceForm/>} />
      <Route path ="/resource" element={<ResourceList/>} />
      {/* <Route path ="/resource/edit/:id" element={<ResourceEdit/>} /> */}
      <Route path ="/resource/class" element={<MasterClass/>} />
      <Route path ="/resource/type" element={<MasterType/>} />
      <Route path ="/resource/status" element={<MasterStatus/>} />
      <Route path="/ping" element={<PingCheck />} />
      <Route path="/dashboard" element={<Dashboardpage/>} />
      <Route path="/employees" element={<EmployeeListPage/>} />



    
    </Routes>
  );
};

export default AppRoutes;
