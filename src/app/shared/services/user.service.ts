import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import * as server from '../server';
import { ServerResponse } from '@delifood/interfaces/server-response.interface';
import { Store } from '@ngrx/store';

import * as fromRoot from '@delifood/store/reducers';
import * as UserActions from '@delifood/store/user/user.actions';
import { RegistrationData, LoginCredentials } from '@delifood/interfaces/user.interface';
import { User } from '@delifood/store/users/users.model';

@Injectable()
export class UserService {

    constructor (
        private http: HttpClient,
        private store: Store<fromRoot.State>
    ) {
    }
    
    public register(userData: RegistrationData): Observable<object> {

        return this.http.post(server.USER_ENDPOINT, userData);
    }

    public login(credentials: LoginCredentials): Observable<any>{

        return this.http.post(server.USER_ENDPOINT + '/login', credentials);
    }

    public logout (): void {

        localStorage.clear();
        this.store.dispatch(new UserActions.Logout());
    }

    public loadUser (): void {

        try {
            let user = JSON.parse(localStorage.getItem('user'));
            this.store.dispatch(new UserActions.LoadUser(user));
        }
        catch (error) {
            let user = {
                name: 'guest',
                email: 'guest@mail.com',
                role: 'guest'
            }

            this.store.dispatch(new UserActions.LoadUser(user));
        }
    }

    public getUsers (): Observable<any> {
        
        return this.http.get(server.USER_ENDPOINT);
    }

    public getUsersCount (): Observable<any> {

        return this.http.get(server.USER_ENDPOINT + '/count');
    }

    public deleteUser (id: string): Observable<any> {

        return this.http.delete(server.USER_ENDPOINT + '/' + id);
    }

    public editUserInfo (user: User): Observable<any> {

        return this.http.put(server.USER_ENDPOINT + '/' + user.id, user);
    }

    public setUserOrderStatus(status: boolean) {

        try {
            let user = JSON.parse(localStorage.getItem('user'));
            user.hasPendingOrder = status;
            localStorage.setItem('user', JSON.stringify(user));
        }
        catch (err) {
            console.error(err);
        }
    }

    public hasPendingOrder(): boolean {
        try {
            return JSON.parse(localStorage.getItem('user')).hasPendingOrder;
        }
        catch (err) {
            console.error(err);
            return false;
        }
    }
}
