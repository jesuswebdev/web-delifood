export interface Product {
    id: string;
    name: string;
    description: string;
    category: {
        name: string;
        id: string;
        slug?: string;
    };
    price: number;
    visible?: boolean;
    totalTimesOrdered?: number;
    totalSold?: number;
    created?: Date;
    img?: string;
    slug?: string;
}
