import { Product } from "@delifood/store/product/product.model";

export interface Page {
    products: Product[];
    number: number;
    hasNext: boolean;
    hasPrevious: boolean;
}
