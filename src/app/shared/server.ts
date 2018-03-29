import { HttpHeaders } from '@angular/common/http';

export const GUEST_TOKEN: string = 'Fe26.2**edbf5fa561bd037811e90833c31b4666cecdbc62cdb9e0c36e3b039201375205*SriKon8DHQ5qbUPZuBdEmw*3KgCe25MHgIJsYLCwKjdGYUmVabHzEpHP_FLoX-UPR8**a5e3f765f7bb2226dce4033d109c19e3a947c8af98a3f2ed4da57a4a878d227d*FxOtzxBsjIvehbv_KxBXRKQD9wgyl53c6b0RtgrQRk8';
export const USER_TOKEN: string = '';
export const ADMIN_TOKEN: string = '';

export const ENDPOINT: string = 'https://api-delifood.herokuapp.com/api';

export const USER_ENDPOINT: string = `${ENDPOINT}/users`;
export const CATEGORY_ENDPOINT: string = `${ENDPOINT}/categories`;
export const PRODUCT_ENDPOINT: string = `${ENDPOINT}/products`;
export const ORDER_ENDPOINT: string = `${ENDPOINT}/orders`;
export const AUTH_ENDPOINT: string = `${ENDPOINT}/auth`;
export const TEST_ENDPOINT: string = `http://localhost:3000/test`;

const defaultHeaders: HttpHeaders = new HttpHeaders({
    'Authorization': `Bearer ${GUEST_TOKEN}`,
    'Content-Type': 'application/json'
});

export const DEFAULT_OPTIONS = { headers: defaultHeaders };

export function customAuthHeader(token): object {
    let header: HttpHeaders = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    });

    return { headers: header };
}