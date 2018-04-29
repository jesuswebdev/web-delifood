import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

import * as UserActions from '../../store/user/user.actions';
import * as fromRoot from '../../store/reducers';
import { UserService } from '@delifood/services/user.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
    selector: 'nav-bar-component',
    templateUrl: 'nav-bar.component.html'
})

export class NavBarComponent implements OnInit, OnDestroy {

    role: string;

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private store: Store<fromRoot.State>,
        private userService: UserService
    ){
        this.store.select(state => state.user)
        .takeUntil(this.destroy$)
        .subscribe(user => {

            this.role = user.role;
        });
    }

    ngOnInit () {

        this.userService.loadUser();
    }

    navBarToggle() {
        
        let burger = document.getElementById('navBurger');
        burger.classList.toggle('is-active');
        document.getElementById(burger.dataset.target).classList.toggle('is-active');
    }

    navButtonPressed() {

        let burger = document.getElementById('navBurger');

        if (burger.classList.contains('is-active')) {
            burger.classList.toggle('is-active');
            document.getElementById(burger.dataset.target).classList.toggle('is-active');
        }
    }

    activateLogoutModal() {
        
        this.store.dispatch(new UserActions.ActivateLogoutModal());
    }

    ngOnDestroy () {
        
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    get navLinks() {
        
        let links = [];

        if (this.role === 'user') {
            links = [
                { path: '/comidas', name: 'Comidas' },
                { path: '/pedidos', name: 'Mis Pedidos' }
            ]
        }
        else if (this.role === 'admin') {
            links = [
                { path: '/admin/panel', name: 'Panel Administrativo' },
                { path: '/comidas', name: 'Comidas' },
                { path: '/pedidos', name: 'Mis Pedidos' }
            ]
        }
        else {
            links = [
                { path: '/comidas', name: 'Comidas' }
            ]
        }

        return links;
    }
}
