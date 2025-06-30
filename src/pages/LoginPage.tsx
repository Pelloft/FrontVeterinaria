
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Typography, message } from 'antd';
//import api from '../api/axios'; // Asegúrate de que la ruta sea correcta

const { Title } = Typography;

const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (values: { correo: string; clave: string }) => {
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
                correo: values.correo,
                clave: values.clave,
            });

            localStorage.setItem('token', response.data.token);
            navigate('/home');
        } catch (err) {
            message.error('Correo o clave incorrectos');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <Title level={2} style={{ textAlign: 'center', padding: '5rem' }}>Iniciar Sesión</Title>
            <Form
                layout="vertical"
                onFinish={handleLogin}
                style={{ maxWidth: 400, margin: '0 auto' }}
            >
                <Form.Item
                    label="Correo"
                    name="correo"
                    rules={[
                        { required: true, message: 'Por favor ingrese su correo' },
                        { type: 'email', message: 'Ingrese un correo válido' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Clave"
                    name="clave"
                    rules={[{ required: true, message: 'Por favor ingrese su clave' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        Ingresar
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button type="link" block onClick={() => navigate("/register")}>
                        ¿No tienes cuenta? Regístrate aquí
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginPage;

