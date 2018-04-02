export interface User {
    name: string;
    email: string;
    role: string;
    token?: string;
    created?: Date;
    banned?: boolean;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegistrationData {
    name: string;
    email: string;
    password: string;
    role?: string;
}
