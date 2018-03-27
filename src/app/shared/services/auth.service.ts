import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ServerService } from './server.service';

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
            return 'Fe26.2**a3de7270e52327b5dc4f9dac2d6bc4d828c4a57a3f366d02170e1862fc21c7cd*bOwFEAhWrSUsvtFWT_LnFw*n7qsLAz3mcknv-LyQQ3Ic_4Q5GscNMGVsUZtU_7n-SE**b6d3e6cab920eaa478203db21f443c55753269a5b2eae0cbfa29ea017426992e*65FUiO1jdxFpYUOH4K-A6dc0VjnnY1p73FMJG-FCBLs';
        }
    }
}