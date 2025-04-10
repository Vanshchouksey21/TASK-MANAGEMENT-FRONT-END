import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Userlogin from './user/Userlogin';
import AdminDashboard from './admin/AdminDashboard';
import Usercreation from './admin/Usercreation';
import Userdasboard from './user/Userdasboard';
import MyTasks from './user/MyTasks';
import Tasks from './admin/Tasks';

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
            <Route path='tasks' element={<Tasks />} />
          </Route>

          {/* User Dashboard Route - directly accessible */}
          <Route path='userdashboard' element={<Userdasboard />} >
            <Route path='mytasks' element={<MyTasks />} />
            
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
