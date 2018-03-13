import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { ServerService } from './server.service';
import { RegistrationData } from '../interfaces/registration-data.interface';

@Injectable()
export class UserService {
    constructor(private httpClient: HttpClient, private api: ServerService) { }
    
    register(userData: RegistrationData){
        return this.httpClient.post(this.api.userEndpoint, userData, this.api.defaultOptions);
    }
}