interface Product {
    name: string;
    img: string;
    _id: string
}

export interface OrderItem {
    product: Product;
    unitPrice: number;
    quantity: number;
    totalPrice: number;
}

export interface Order {
    products: OrderItem[];
    totalPayment: number;
    _id: string;
    user: string;
    created: Date;
    paymendId: string;
    paymentProcessor: string;
}
