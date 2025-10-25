import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    // Verificamos si existe el token en localStorage
    const token = localStorage.getItem('accessToken');

    if (!token) {
        // Si no hay token, redirigimos al login
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;