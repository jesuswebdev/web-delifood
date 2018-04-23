import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '@delifood/services/auth.service';

@Injectable()
export class IsAuthorizedUserGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {

        let loggedIn = this.authService.isLoggedIn();

        if (!loggedIn && this.router.routerState.snapshot.url === '') {
            this.router.navigate(['/']);
        }
        
        return loggedIn;
    }
}
