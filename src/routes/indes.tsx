import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import FacturaPage from '../pages/FacturaPage';
import PrivateRoute from '../componentes/PrivateRoute';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/FacturaPageD" element={<FacturaPage />} />


                {/* Ruta protegida */}
                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <HomePage />
                            {/* <FacturaPage /> */}
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
