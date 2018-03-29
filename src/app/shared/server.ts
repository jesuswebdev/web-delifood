import { HttpHeaders } from '@angular/common/http';

export const GUEST_TOKEN: string = 'Fe26.2**e083794775bcffe025edecc4b20d160e4150bad5bbf4aca9ca412ae33ddd717f*vVMEpYKLYctAIYmFKojB4w*ITh6DBbl-oGNoNxVLoZSQM96Pp8g9Bv7ua2TXpHU8sI**8438fa227019e10df06d6a8e7c301e2f48b341b2de0796de306df2d2ae35b4a4*k5kzt5JgbB-Dt9V9aGRHgLn5UfoxFVTSdBgx5NDGJdI';
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