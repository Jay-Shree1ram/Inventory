import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import LoginSignupPage from '../pages/LoginSignupPage.jsx';
import InventoryDashboard from '../components/Inventory/dashboard.js';
import ResourceForm from '../components/Resource/resourcecreate.js';
import ResourceList from '../components/Resource/resourcelist.js';
import MasterClass from '../components/Master/masterclass.jsx';
import MasterType from '../components/Master/mastertype.jsx';
import MasterStatus from '../components/Master/masterstatus.jsx';
import PingCheck from '../pages/PingCheck';
import Dashboardpage from '../pages/Dashboardpage.jsx';
import EmployeeListPage from '../pages/EmployeeListPage.jsx';
import Glitch404 from '../components/NotFound/Glitch404.jsx';
import Unauthorized from '../pages/Unauthorized.jsx';
import PrivateRoute from '../components/Auth/PrivateRoute.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginSignupPage />} />
      <Route path="/ping" element={<PingCheck />} />

      {/* Private Routes (Any logged-in user) */}
      <Route
        path="/inventory"
        element={
          <PrivateRoute>
            <InventoryDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/resource"
        element={
          <PrivateRoute>
            <ResourceList />
          </PrivateRoute>
        }
      />
      <Route
        path="/resource/create"
        element={
          <PrivateRoute>
            <ResourceForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/resource/class"
        element={
          <PrivateRoute>
            <MasterClass />
          </PrivateRoute>
        }
      />
      <Route
        path="/resource/type"
        element={
          <PrivateRoute>
            <MasterType />
          </PrivateRoute>
        }
      />
      <Route
        path="/resource/status"
        element={
          <PrivateRoute>
            <MasterStatus />
          </PrivateRoute>
        }
      />

      {/* Admin-only routes */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute requiredRole="ADMIN">
            <Dashboardpage />
          </PrivateRoute>
        }
      />
      <Route
        path="/employees"
        element={
          <PrivateRoute requiredRole="ADMIN">
            <EmployeeListPage />
          </PrivateRoute>
        }
      />

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<Glitch404 />} />
    </Routes>
  );
};

export default AppRoutes;
