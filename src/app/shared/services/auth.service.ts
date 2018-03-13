import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ServerService } from './server.service';

@Injectable()
export class AuthService {
    constructor(private httpClient: HttpClient, private storage: Storage, private api: ServerService) {}

    isLoggedIn(){
        return this.storage.getItem('token') ? true : false;
    }

    isAdmin(){

        let token: string = this.storage.getItem('token');
        if(!token){
            return false;
        }

        return this.httpClient.get(this.api.authEndpoint, this.api.customAuthHeader(token));
    }
}