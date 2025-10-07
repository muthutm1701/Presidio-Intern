import React from 'react';
import { useAuth } from '../contexts/authContext';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useAuth();
    const location = useLocation();

    
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
 
    if (allowedRoles && !allowedRoles.includes(user.role)) {
       
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
