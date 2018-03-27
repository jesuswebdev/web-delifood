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
        { path: '/', name: 'Home' },
        { path: '/productos', name: 'Productos' }
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
        { path: '/', name: 'Home' },
        { path: '/productos', name: 'Productos' }
    ],
    navEnd: [
        { path: '/cuenta', name: 'Mi Cuenta' },
        { path: '/logout', name: 'Salir' }
    ]
};

export const ADMIN_LINKS: NavLinks = {
    navStart: [
        { path: '/', name: 'Home' },
        { path: '/admin/dashboard', name: 'Panel Administrativo' }
    ],
    navEnd: [
        { path: '/cuenta', name: 'Mi Cuenta' },
        { path: '/logout', name: 'Salir' }
    ]
};