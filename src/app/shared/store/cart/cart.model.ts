import { Product } from '@delifood/store/product/product.model';

export interface CartItem {
    item: Product;
    quantity: number;
    total: number;
}

export interface Cart {
    items: CartItem[];
    totalItems: number;
    totalPayment: number;
}
