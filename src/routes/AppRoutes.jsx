// import React from 'react';
// import { jwtDecode } from 'jwt-decode';
// import { Routes, Route } from 'react-router-dom';
// import Home from '../pages/Home.jsx';
// import LoginSignupPage from '../pages/LoginSignupPage.jsx';
// import InventoryDashboard from '../components/Inventory/dashboard.js';
// import ResourceForm from '../components/Resource/resourcecreate.js';
// import ResourceList from '../components/Resource/resourcelist.js';
// import MasterClass from '../components/Master/masterclass.jsx';
// import MasterType from '../components/Master/mastertype.jsx';
// import MasterStatus from '../components/Master/masterstatus.jsx';
// import EmployeeList from '../components/Employee/list.jsx';
//  import UserPage from '../components/User/user.jsx'; // Uncomment if you want to use UserPage
// const AppRoutes = () => {
//   const accessToken = localStorage.getItem("accessToken");
//   const decoded=  jwtDecode(accessToken) 
//   console.log("Decoded token:", decoded);
//   console.log("Decoded Token sub", decoded.sub);
//   return (
    
   
//     <Routes>
//       <Route path="/" element={<Home/>} />
//       <Route path="/login" element={<LoginSignupPage/>} />
//       <Route path="/inventory" element={<InventoryDashboard/>} />
//       <Route path ="/resource/create" element={<ResourceForm/>} />
//       <Route path ="/resource" element={<ResourceList/>} />
//       <Route path ="/resource/class" element={<MasterClass/>} />
//       <Route path ="/resource/type" element={<MasterType/>} />
//       <Route path ="/resource/status" element={<MasterStatus/>} />
//       <Route path ="/employee" element={<EmployeeList/>} />
//       <Route path ="/user" element={<UserPage/>} />
    
//     </Routes>
//   );
// };

// export default AppRoutes;


import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Home from "../pages/Home.jsx";
import LoginSignupPage from "../pages/LoginSignupPage.jsx";
import InventoryDashboard from "../components/Inventory/dashboard.js";
import ResourceForm from "../components/Resource/resourcecreate.js";
import ResourceList from "../components/Resource/resourcelist.js";
import MasterClass from "../components/Master/masterclass.jsx";
import MasterType from "../components/Master/mastertype.jsx";
import MasterStatus from "../components/Master/masterstatus.jsx";
import EmployeeList from "../components/Employee/list.jsx";
import UserPage from "../components/User/user.jsx";

const AppRoutes = () => {
  const accessToken = localStorage.getItem("accessToken");

  let isAdmin = false;
  if (accessToken) {
    try {
      const decoded = jwtDecode(accessToken);
      isAdmin = decoded.sub === "admin@hotmail.com";
    } catch (error) {
      console.error("Token decode error", error);
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginSignupPage />} />
      <Route path="/resource/create" element={isAdmin ? <ResourceForm /> :<Navigate to ="/"/>} />
      <Route path="/resource" element={<ResourceList />} />
      <Route path="/resource/class" element={isAdmin? <MasterClass />:<Navigate to= "/"/>} />
      <Route path="/resource/type" element={isAdmin? <MasterType />:<Navigate to ="/"/>} />
      <Route path="/resource/status" element={isAdmin ? <MasterStatus />:<Navigate to ="/" />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/inventory" element={ isAdmin? <InventoryDashboard /> :<Navigate to ="/"/>}/>
      <Route path="/employee" element={isAdmin ? <EmployeeList /> : <Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
