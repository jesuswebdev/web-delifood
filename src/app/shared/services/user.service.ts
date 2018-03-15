import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { ServerService } from './server.service';
import { RegistrationData } from '../interfaces/registration-data.interface';
import { LoginData } from '../interfaces/login-data.interface';

@Injectable()
export class UserService {
    constructor(private httpClient: HttpClient, private api: ServerService) { }
    
    register(userData: RegistrationData): Observable<object> {

        return this.httpClient.post(
                                    this.api.userEndpoint,
                                    userData,
                                    this.api.defaultOptions
                                );

    }

    login(userData: LoginData): Observable<object> {

        return this.httpClient.post(
                                    this.api.userEndpoint + '/login',
                                    userData,
                                    this.api.defaultOptions
                                );

    }
}