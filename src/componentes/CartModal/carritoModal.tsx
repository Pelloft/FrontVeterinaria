import React from "react";
import { Drawer, List, Button, Typography, Divider } from 'antd';

const { Text, Title } = Typography;

interface CarritoItem{
    id: number;
    nombre: string;
    precio: number;
    cantidad: number;
}

interface CarritoModalProps { 
    visible: boolean;
    onClose: () => void;
    items: CarritoItem[];
    onRemoveItem: (id: number) => void;
}

const CartModal: React.FC<CarritoModalProps> = ({ visible, onClose, items, onRemoveItem }) => {
    const subtotal = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const iva = subtotal * 0.12;
    const total = subtotal + iva;

    return (
        <Drawer
            title="🛒 Carrito de compras"
            placement="right"
            closable
            onClose={onClose}
            open={visible}
            width={350}
        >
            {items.length === 0 ? (
                <Text type="secondary">Tu carrito está vacío</Text>
            ) : (
                <>
                    <List
                        dataSource={items}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <Button danger size="small" onClick={() => onRemoveItem(item.id)}>
                                        Eliminar
                                    </Button>,
                                ]}
                            >
                                <List.Item.Meta
                                    title={item.nombre}
                                    description={`Cantidad: ${item.cantidad}`}
                                />
                                <div>${(item.precio * item.cantidad).toFixed(2)}</div>
                            </List.Item>
                        )}
                    />

                    <Divider />

                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Text>Subtotal:</Text>
                        <Text>${subtotal.toFixed(2)}</Text>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Text>IVA (12%):</Text>
                        <Text>${iva.toFixed(2)}</Text>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                        <Text>Total:</Text>
                        <Text>${total.toFixed(2)}</Text>
                    </div>

                    <Button type="primary" block style={{ marginTop: 16 }}>
                        Finalizar compra
                    </Button>
                </>
            )}
        </Drawer>
    );
};

export default CartModal;