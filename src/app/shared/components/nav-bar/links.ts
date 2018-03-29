interface Link {
    path: string;
    name: string;
};

export interface NavLinks {
    navStart: Link[],
    navEnd: Link[]
};

export const GUEST_LINKS: NavLinks = {
    navStart: [
        { path: '/comidas', name: 'Comidas' }
    ],
    navEnd: [
        { path: '/login', name: 'Login' },
        { path: '/registro', name: 'Registro' }
    ]
};

// export const GUEST_LINKS: Link[] = [
//     { path: '/', name: 'Home' },
//     { path: '/productos', name: 'Productos' },
//     { path: '/login', name: 'Login' },
//     { path: '/registro', name: 'Registro' }
// ];
export const USER_LINKS: NavLinks = {
    navStart: [
        { path: '/comidas', name: 'Comidas' }
    ],
    navEnd: [
        { path: '/cuenta', name: 'Mi Cuenta' },
        { path: '/logout', name: 'Salir' }
    ]
};

export const ADMIN_LINKS: NavLinks = {
    navStart: [
        { path: '/admin/dashboard', name: 'Panel Administrativo' }
    ],
    navEnd: [
        { path: '/cuenta', name: 'Mi Cuenta' },
        { path: '/logout', name: 'Salir' }
    ]
};