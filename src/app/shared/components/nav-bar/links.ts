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
        { path: '/login', name: 'Iniciar Sesión' },
        { path: '/registro', name: 'Registro' }
    ]
};

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
        { path: '/admin/panel', name: 'Panel Administrativo' },
        { path: '/comidas', name: 'Comidas' }
    ],
    navEnd: [
        { path: '/cuenta', name: 'Mi Cuenta' },
        { path: '/logout', name: 'Salir' }
    ]
};
