import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '@delifood/services/user.service';
import { AuthService } from 'angularx-social-login';
import * as fromRoot from '@delifood/store/reducers';
import * as UserActions from '@delifood/store/user/user.actions';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/takeUntil';


@Component({
    selector: 'delifood-logout',
    templateUrl: './logout.component.html'
})

export class LogoutComponent implements OnInit, OnDestroy {

    active: boolean = false;
    isLoading: boolean = false;
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor (
        private userService: UserService,
        private router: Router,
        private authService: AuthService,
        private store: Store<fromRoot.State>
    ) {

        this.store.select(state => state.user.logoutModalIsActive)
        .takeUntil(this.destroy$)
        .subscribe(status => {
            
            this.active = status;
        });
    }

    onDismissModal() {
        this.store.dispatch(new UserActions.DismissLogoutModal());
    }

    onConfirmLogout() {

        this.isLoading = true;

        setTimeout(() => {

            this.isLoading = false;
            this.userService.logout();
            this.authService.signOut().then(
                () => { this.router.navigate(['/']); },
                () => { this.router.navigate(['/']); }
            ).catch(err => console.log(err));      
        }, 1000)
        
    }

    ngOnInit(): void { }
    
    ngOnDestroy() {

        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
