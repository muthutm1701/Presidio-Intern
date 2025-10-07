import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Layout from './pages/Layout';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';

import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './contexts/authContext';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route path="/" element={
          <ProtectedRoute>
              <Layout />
          </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/login" />} />
        <Route path="teacher-dashboard" element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <TeacherDashboard />
          </ProtectedRoute>
        }/>
        <Route path="student-dashboard" element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentDashboard />
          </ProtectedRoute>
        }/>
        <Route path="admin-dashboard" element={
          <ProtectedRoute allowedRoles={['admin']}>
            {/* <AdminDashboard /> */}
          </ProtectedRoute>
        }/>
      </Route>

      <Route path="*" element={<Navigate to="/login" />} /> 
    </Routes>
  );
}

export default App;
