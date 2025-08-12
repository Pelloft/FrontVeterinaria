import "../styles/HomePage.css";
import { useNavigate } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";
import { Row, Col, Card, Button, Typography } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { Badge, Popover } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';



const { Title } = Typography;

interface Servicio {
    id: number;
    nombre: string;
    tarifa: number;
    imagenRuta: string;
}

const HomePage = () => {
    const navigate = useNavigate();
    const user = getUserFromToken();
    const [servicios, setServicios] = useState<Servicio[]>([]);
    const [carrito, setcarrito] = useState<Servicio[]>(() => {
        const carritoGuardado = localStorage.getItem('carrito');
        return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    });


    useEffect(() => {
        const fetchServicios = async () => {
            try {
                // const response = await axios.get('https://localhost:44362/api/Servicio/Listar');
                const baseUrl = import.meta.env.VITE_API_URL;
                const staticUrl = import.meta.env.VITE_STATIC_URL;

                const response = await axios.get(`${baseUrl}/Servicio/Listar`);

                const serviciosConImagen = response.data.$values.map((servicio: Servicio) => ({
                    ...servicio,
                    imagenRuta: `${staticUrl}/${servicio.imagenRuta}`
                }));
                setServicios(serviciosConImagen);
            } catch (error) {
                console.error('Error al cargar servicios', error);
            }
        };
        fetchServicios();
    }, []);
    
    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const agregarCarrito = (servicio: Servicio) => {
        const yaExiste = carrito.some(item => item.id === servicio.id);
        if (!yaExiste) {
            setcarrito(prev => [...prev, servicio]);
        }
    };

    const eliminarCarrito = (id: number) => {
        setcarrito(prev => prev.filter(item => item.id !== id));
    };

    const calcularTotal = () => {
        return carrito.reduce((acum, item) => acum + item.tarifa, 0);
    };

    return (
        <div className="home-container" style={{ padding: 24, position: 'relative' }}>
            {/* Tarjeta bienvenida */}
            <div className="home-card">
                <h2 className="home-title">Bienvenido, {user?.correo}</h2>
                <button className="home-button" onClick={handleLogout}>
                    Cerrar sesión
                </button>

            </div>

            <div style={{ position: 'absolute', top: 20, right: 20 }}>
                <Popover
                    content={
                        carrito.length === 0 ? (
                            <p>Carrito vacío</p>
                        ) : (
                            <div>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {carrito.map(item => (
                                        <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                            <span>{item.nombre} - ${item.tarifa}</span>
                                            <Button
                                                type="text"
                                                danger
                                                size="small"
                                                onClick={() => eliminarCarrito(item.id)}
                                            >
                                                X
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                                <div style={{ fontWeight: 'bold', textAlign: 'right' }}>
                                    Total: ${calcularTotal()}
                                </div>
                            </div>
                        )
                    }

                    title="Carrito"
                    trigger="click"
                >
                    <Badge count={carrito.length} showZero>
                        <ShoppingCartOutlined style={{ fontSize: '24px', cursor: 'pointer' }} />
                    </Badge>
                </Popover>
            </div>


            {/* Servicios */}
            <div className="servicios-container">
                <Title level={2} style={{ textAlign: "center", paddingBottom: "10rem" }}>
                    Servicios
                </Title>
                <Row gutter={[16, 16]} justify="center">
                    {servicios.map((servicio, index) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={index}>
                            <Card
                                hoverable
                                cover={
                                    <img
                                        alt={servicio.nombre}
                                        src={servicio.imagenRuta}
                                    />
                                }
                            >
                                <Card.Meta
                                    title={servicio.nombre}
                                    description={`Tarifa: $${servicio.tarifa}`}
                                />
                                <div style={{ marginTop: '10px' }}>
                                    <Button type="primary" onClick={() => agregarCarrito(servicio)}>
                                        Agregar al carrito
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>

            </div>
        </div>
    );
};

export default HomePage;

