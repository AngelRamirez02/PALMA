// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('access_token');
    const expiration = localStorage.getItem('expires_in');
    
    // Obtenemos la hora actual en milisegundos
    const now = new Date().getTime();

    //Comprobamos si el token o la expiración no existen
    if (!token || !expiration) {
        return <Navigate to="/login" replace />;
    }

    //Comprobamos si la hora actual es MAYOR que la hora de expiración
    if (now > expiration) {
        // El token ha expirado.
        // Limpiamos el localStorage por seguridad.
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_in');
        
        // Redirigimos al login
        return <Navigate to="/login" replace />;
    }

    // Si el token existe y no ha expirado, permitimos el acceso
    return <Outlet />;
};

export default ProtectedRoute;