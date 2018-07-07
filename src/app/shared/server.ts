import { environment } from "environments/environment";

export const GUEST_TOKEN: string = environment.GUEST_TOKEN;
export const USER_TOKEN: string = '';
export const ADMIN_TOKEN: string = '';

export const ENDPOINT: string = environment.API_URL;

export const USER_ENDPOINT: string = `${ENDPOINT}/users`;
export const CATEGORY_ENDPOINT: string = `${ENDPOINT}/categories`;
export const PRODUCT_ENDPOINT: string = `${ENDPOINT}/products`;
export const ORDER_ENDPOINT: string = `${ENDPOINT}/orders`;
export const COMMENTS_ENDPOINT: string = `${ENDPOINT}/comments`
export const AUTH_ENDPOINT: string = `${ENDPOINT}/auth`;

export const TEST_ENDPOINT: string = `http://localhost:3000/test`;
