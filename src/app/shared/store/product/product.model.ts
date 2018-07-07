import { Comment } from "@delifood/store/comments/comment.model";

export interface Product {
    id: string;
    _id?: string;
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
    commentsCount: number;
    rating: number;
    comments?: Comment[];
    totalRating?: number;
}
