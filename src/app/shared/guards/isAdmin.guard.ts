import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '@delifood/services/auth.service';

@Injectable()
export class IsAdminGuard implements CanLoad {

    constructor (private authService: AuthService) { }
    canLoad(
        route: Route
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isAdmin();
    }
}
