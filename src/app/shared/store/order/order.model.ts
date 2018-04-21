export interface OrderItem {
    product: string;
    unitPrice: number;
    quantity: number;
    totalPrice: number;
}

export interface Order {
    products: OrderItem[];
    totalPayment: number;
}
