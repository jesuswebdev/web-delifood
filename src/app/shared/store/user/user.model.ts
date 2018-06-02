export interface User {
    name: string;
    email: string;
    address?: string;
    phone?: string;
    role: string;
    token?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}
