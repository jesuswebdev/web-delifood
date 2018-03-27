export interface User {
    name: string;
    email: string;
    role: string;
    token?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegistrationData {
    name: string;
    email: string;
    password: string;
}