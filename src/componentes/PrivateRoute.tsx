import { Navigate } from 'react-router-dom';
//import React from 'react'; // importa React por si lo necesitas
import type { JSX } from 'react'; // importa solo los tipos necesarios



interface PrivateRouteProps {
    children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;
