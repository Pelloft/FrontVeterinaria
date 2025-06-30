// src/routes/AppRouter.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import FacturaPage from '../pages/FacturaPage';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Página de login */}
                <Route path="/login" element={<LoginPage />} />

                {/* Página principal (a proteger con autenticación más adelante) */}
                <Route path="/home" element={<HomePage />} />
                <Route path="/FacturaPage" element={<FacturaPage />} />

                {/* Redirección por defecto */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
