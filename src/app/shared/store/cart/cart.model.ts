import { Product } from '@delifood/store/product/product.model';

export interface CartItem {
    item: Product;
    unitPrice: number;
    quantity: number;
    total: number;
}

export interface Cart {
    products: CartItem[];
    totalPayment: number;
}
