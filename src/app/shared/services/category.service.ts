import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { CATEGORY_ENDPOINT } from '../server';

@Injectable()
export class CategoryService {
    
    constructor(private http: HttpClient) { }
    
    public getCategories (): Observable<any> {

        return this.http.get(CATEGORY_ENDPOINT);
    }

    public deleteCategory (id: string): Observable<any> {

        return this.http.delete(CATEGORY_ENDPOINT + '/' + id);
    }

    public createCategory (category: FormData): Observable<any> {

        return this.http.post(CATEGORY_ENDPOINT, category);
    }
}
