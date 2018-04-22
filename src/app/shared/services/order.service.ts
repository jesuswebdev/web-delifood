import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ENDPOINT } from '../server';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrderService {

    constructor(private http: HttpClient) { }
    
    public sendOrder(order: any): Observable<any> {

        return this.http.post(`${ENDPOINT}/orders`, order);
    }

    public getOrders(): Observable<any> {

        return this.http.get(`${ENDPOINT}/orders`);
    }
}
