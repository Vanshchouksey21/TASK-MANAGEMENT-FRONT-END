import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Userlogin from './user/Userlogin';
import AdminDashboard from './admin/AdminDashboard';
import Usercreation from './admin/Usercreation';
import Userdasboard from './user/Userdasboard';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Routes using Layout */}
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='userlogin' element={<Userlogin />} />
          </Route>

          {/* Admin Routes */}
          <Route path='admindashboard' element={<AdminDashboard />}>
            <Route path='usercreation' element={<Usercreation />} />
          </Route>

          {/* User Dashboard Route - directly accessible */}
          <Route path='userdashboard' element={<Userdasboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
