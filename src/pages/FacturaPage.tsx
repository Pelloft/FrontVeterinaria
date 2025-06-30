import { useEffect, useState } from "react";
import { Form, Input, Button, Select, Space, Typography, Divider } from "antd";
import axios from "axios";


const { Title } = Typography;
const { Option } = Select;

interface Servicio {
    id: number;
    nombre: string;
    tarifa: number;
}

interface DetalleItem {
    servicioId: number;
    nombre: string;
    tarifa: number;
}

const IVA = 0.12;

const FacturePage = () => {
    const [servicios, setServicios] = useState<Servicio[]>([]);
    const [detalles, setDetalles] = useState<DetalleItem[]>([]);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchServicios = async () => {
            try {
                const response = await axios.get('https://localhost:44362/api/servicios');
                console.log("serviciio111", response);
                console.log("serviciio", response.data);

                setServicios(response.data);
            } catch (error) {
                console.error('Error al cargar servicios', error);
            }
        };
        fetchServicios();
    }, []);

    const handleAddDetalle = () => {
        setDetalles([...detalles, { servicioId: 0, nombre: '', tarifa: 0 }]);
    };

    const handleServicioChange = (index: number, servicioId: number) => {
        const servicio = servicios.find(s => s.id === servicioId);
        if (!servicio) return;

        const newDetalles = [...detalles];
        newDetalles[index] = {
            servicioId,
            nombre: servicio.nombre,
            tarifa: servicio.tarifa
        };
        setDetalles(newDetalles);
    };

    const calcularSubtotal = () => detalles.reduce((acc, item) => acc + item.tarifa, 0);
    const calcularIVA = () => calcularSubtotal() * IVA;
    const calcularTotal = () => calcularSubtotal() + calcularIVA();

    const onFinish = (values: any) => {
        console.log('Datos completos de la factura:', {
            dueño: values.dueno,
            mascota: values.mascota,
            detalles,
            subtotal: calcularSubtotal(),
            iva: calcularIVA(),
            total: calcularTotal(),
        });
    };

    return (
        <div style={{ maxWidth: 800, margin: 'auto', padding: 24 }}>
            <Title level={2}>Formulario de Facturación</Title>

            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item label="Nombre del Dueño" name="dueno" rules={[{ required: true }]}>
                    <Input placeholder="Ej: Juan Pérez" />
                </Form.Item>

                <Form.Item label="Nombre de la Mascota" name="mascota" rules={[{ required: true }]}>
                    <Input placeholder="Ej: Firulais" />
                </Form.Item>

                <Divider />
                <Title level={4}>Servicios</Title>

                {detalles.map((detalle, index) => (
                    <Space key={index} direction="horizontal" style={{ display: 'flex', marginBottom: 8 }}>
                        <Select
                            placeholder="Seleccione un servicio"
                            style={{ width: 300 }}
                            value={detalle.servicioId || undefined}
                            onChange={(value) => handleServicioChange(index, value)}
                        >
                            {servicios.map(serv => (
                                <Option key={serv.id} value={serv.id}>{serv.nombre}</Option>
                            ))}
                        </Select>
                        <Input disabled value={`$${detalle.tarifa.toFixed(2)}`} style={{ width: 100 }} />
                    </Space>
                ))}

                <Button type="dashed" onClick={handleAddDetalle} style={{ width: '100%', marginBottom: 16 }}>
                    + Agregar Servicio
                </Button>

                <Divider />
                <div>
                    <p><strong>Subtotal:</strong> ${calcularSubtotal().toFixed(2)}</p>
                    <p><strong>IVA (12%):</strong> ${calcularIVA().toFixed(2)}</p>
                    <p><strong>Total a Pagar:</strong> ${calcularTotal().toFixed(2)}</p>
                </div>

                <Button type="primary" htmlType="submit">
                    Facturar
                </Button>
            </Form>
        </div>
    );
};

export default FacturePage;




