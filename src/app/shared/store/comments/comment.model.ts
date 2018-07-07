export interface Comment {
    createdAt: Date,
    _id: string,
    user: {
        name: string
    },
    product: string,
    text: string,
    rating: number
}
