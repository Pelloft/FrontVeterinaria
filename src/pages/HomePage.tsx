import "../styles/HomePage.css";
import { useNavigate } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";
import { Row, Col, Card } from "antd";


import peluqueria from "../imagen/peluqueria.avif";
import bano_medico from "../imagen/baño_medico.jpg";
import bano_normal from "../imagen/baño_normal.jpg";
import desparacitacion from "../imagen/desparacitacion.jpeg";
import vacunacion from "../imagen/vacuna.avif";
import { useEffect, useState } from "react";
import axios from "axios";

const servicios = [{
    nombre: "Peluqueria canima",
    tarifa: 20,
    imagen: peluqueria,
},
{
    nombre: "Baño medico",
    tarifa: 15,
    imagen: bano_medico,
},
{
    nombre: "Baño normal",
    tarifa: 10,
    imagen: bano_normal,
},
{
    nombre: "Desparacitación",
    tarifa: 5,
    imagen: desparacitacion,
},
{
    nombre: "Vacunación",
    tarifa: 8,
    imagen: vacunacion,
},
];

const HomePage = () => {
    const navigate = useNavigate();
    const user = getUserFromToken();
    const [servicios, setServicios] = useState<any[]>([]);


    useEffect(() => {
        const fetchServicios = async () => {
            try {
                const response = await axios.get('https://localhost:44362/api/Servicio/Listar');
                console.log("serviciio111", response);
                console.log("serviciio", response.data);
                console.log("serviciio23", response.data.$values);

                setServicios(response.data);
            } catch (error) {
                console.error('Error al cargar servicios', error);
            }
        };
        fetchServicios();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token"); //  Elimina el token
        navigate("/login");               //  Redirige al login
    };

    return (
        <div className="home-container">
            <div className="home-card">
                <h2 className="home-title">Bienvenido, {user?.correo}</h2>
                <button className="home-button" onClick={handleLogout}>
                    Cerrar sesión
                </button>
            </div>

            {/* Sección de servicios */}
            <div style={{ marginTop: "4rem", width: "100%", maxWidth: "1200px", marginInline: "auto" }}>
                <Row gutter={[16, 16]} justify="center">
                    {servicios.map((servicio, index) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={index}>
                            <Card
                                hoverable
                                cover={
                                    <img
                                        alt={servicio.nombre}
                                        src={servicio.imagen}
                                        style={{
                                            height: 180,
                                            objectFit: "cover",
                                            padding: "1rem",
                                        }}
                                    />
                                }
                            >
                                <Card.Meta
                                    title={servicio.nombre}
                                    description={`Tarifa: $${servicio.tarifa}`}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default HomePage;


