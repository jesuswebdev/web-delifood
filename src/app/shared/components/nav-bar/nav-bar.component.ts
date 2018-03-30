import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

import * as UserActions from '../../store/user/user.actions';
import * as fromRoot from '../../store/reducers';
import * as fromLinks from './links';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '@delifood/services/user.service';

@Component({
    selector: 'nav-bar-component',
    templateUrl: 'nav-bar.component.html'
})

export class NavBarComponent implements OnInit, OnDestroy {

    name: Observable<String>;
    email: Observable<String>;
    role: Observable<String>;
    links: fromLinks.NavLinks;
    subscription: Subscription;

    constructor(
        private store: Store<fromRoot.State>,
        private userService: UserService
    ){
        this.name = this.store.select(state => state.user.name);
        this.email = this.store.select(state => state.user.email);
        this.role = this.store.select(state => state.user.role);
    }

    ngOnInit () {

        this.userService.loadUser();
        
        this.subscription = this.role.subscribe(role => {

            if (role === 'admin') {
                this.links = fromLinks.ADMIN_LINKS;
            }
            else if (role === 'user') {
                this.links = fromLinks.USER_LINKS;
            }
            else {
                this.links = fromLinks.GUEST_LINKS;
            }
        })
    }

    ngOnDestroy () {
        
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}