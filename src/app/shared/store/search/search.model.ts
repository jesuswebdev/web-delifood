import { Product } from "@delifood/store/product/product.model";

export interface Search {
    terms: string;
    results: Product[];
    resultsCount: number;
}

export interface SearchResults {
    products: Product[];
    resultsCount?: number;
}
