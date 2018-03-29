import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ServerService } from './server.service';
import { GUEST_TOKEN } from '../server';

@Injectable()
export class AuthService {
    constructor(
        private httpClient: HttpClient,
        private api: ServerService
    ) { }

    isLoggedIn(){

        return localStorage.getItem('user') ? true : false;
    }

    isAdmin(){

        try {
            return JSON.parse(localStorage.getItem('user')).role === 'admin';
        }
        catch (error) {
            return false;
        }
    }

    public getToken () {
        
        try {
            return JSON.parse(localStorage.getItem('user')).token;
        }
        catch (error) {
            return GUEST_TOKEN;
        }
    }
}