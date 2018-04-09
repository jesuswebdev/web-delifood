import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { PRODUCT_ENDPOINT } from '../server';


@Injectable()
export class ProductService {

    constructor(private http: HttpClient) { }

    public getProducts(): Observable<any> {

        return this.http.get(PRODUCT_ENDPOINT);
    }

    public deleteProduct(id: string): Observable<any> {

        return this.http.delete(PRODUCT_ENDPOINT + '/' + id);
    }

    public createProduct(product: FormData): Observable<any> {

        return this.http.post(PRODUCT_ENDPOINT, product);
    }

    public updateProduct(id: string, product: FormData): Observable<any> {

        return this.http.put(PRODUCT_ENDPOINT + '/' + id, product);
    }

    public findByName(name: string, limit?: number, offset?: number, init?: boolean): Observable<any> {

        return this.http.get(`${PRODUCT_ENDPOINT}?by=name&q=${name}${limit?'&limit='+limit:''}${offset?'&offset='+offset:''}${init?'&init=true':''}`);
    }

    public find(init?: boolean, offset?: number, limit?: number):Observable<any> {

        return this.http.get(`${PRODUCT_ENDPOINT}?init=${init?'true':'false'}${offset?'&offset='+offset:''}${limit?'&limit='+limit:''}`)
    }

    public findProductBySlug(slug: string): Observable<any> {

        return this.http.get(`${PRODUCT_ENDPOINT}/slug/${slug}`);
    }
}
