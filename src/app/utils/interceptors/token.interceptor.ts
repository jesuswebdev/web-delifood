import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { AuthService } from '@delifood/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor (public auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${this.auth.getToken()}`,
                // 'Content-Type': 'application/json'
            }
        });
        
        return next.handle(req);
    }
}
