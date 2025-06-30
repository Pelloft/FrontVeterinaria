import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
    exp: number;
}


export function getUserFromToken() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const decoded = jwtDecode<TokenPayload>(token);
        return {
            id: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
            correo: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
        };
    } catch (error) {
        console.error("Token inválido:", error);
        return null;
    }
}