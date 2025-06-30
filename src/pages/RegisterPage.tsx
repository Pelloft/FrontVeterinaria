// src/pages/RegisterPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Typography, message } from "antd";

const { Title } = Typography;

const RegisterPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleRegister = async (values: { nombre: string; correo: string; clave: string }) => {
        setLoading(true);
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
                nombre: values.nombre,
                correo: values.correo,
                clave: values.clave,
            });

            message.success("Usuario registrado con éxito.");
            navigate("/login");
        } catch (error: any) {
            if (error.response?.status === 409) {
                message.error("El correo ya está registrado.");
            } else {
                message.error("Ocurrió un error al registrar.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <Title level={2} style={{ textAlign: "center", padding: '5rem' }}>Crear Cuenta</Title>
            <Form
                layout="vertical"
                onFinish={handleRegister}
                style={{ maxWidth: 400, margin: "0 auto" }}>

                <Form.Item
                    label="Nombre de Usuario"
                    name="nombre"
                    rules={[{ required: true, message: 'Por favor, ingresa un nombre de usuario' }]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    label="Correo"
                    name="correo"
                    rules={[
                        { required: true, message: "Ingrese un correo" },
                        { type: "email", message: "Correo inválido" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Clave"
                    name="clave"
                    rules={[
                        { required: true, message: "Ingrese una clave" },
                        { min: 6, message: "La clave debe tener al menos 6 caracteres" },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        Registrarse
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button type="link" block onClick={() => navigate("/login")}>
                        ¿Ya tienes cuenta? Iniciar sesión
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default RegisterPage;
