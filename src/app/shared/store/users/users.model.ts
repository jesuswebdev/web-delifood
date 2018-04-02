export interface User {
    id: string;
    name: string;
    email: string;
    banned: boolean;
    role?: string;
    created?: Date;
}
