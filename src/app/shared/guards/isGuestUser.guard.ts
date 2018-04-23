import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '@delifood/services/auth.service';

@Injectable()
export class IsGuestUserGuard implements CanActivate {

    constructor(private authService: AuthService){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        
        return !this.authService.isLoggedIn();
    }
}
