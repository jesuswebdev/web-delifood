import { Component, OnInit } from '@angular/core';
import { UserService } from '@delifood/services/user.service';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '@delifood/store/reducers'
import * as UsersActions from '@delifood/store/users/users.actions';
import { Store } from '@ngrx/store';
import { User } from '@delifood/store/users/users.model';
import { Router } from '@angular/router';

@Component({
    templateUrl: './manage-users.component.html'
})
export class ManageUsersComponent implements OnInit {

    count: Observable<number>;
    users: Observable<User[]>;
    hasErrors: boolean = false;

    constructor (
        private userService: UserService,
        private store: Store<fromRoot.State>,
        private router: Router
    ) {

        this.count = this.store.select(state => state.users.count);
        this.users = this.store.select(state => state.users.users);
     }

    ngOnInit () { 

        this.userService.getUsers().subscribe((response) => {

            this.store.dispatch(new UsersActions.SetUsersCount(response.data.length));
            this.store.dispatch(new UsersActions.GetUsersSuccess(response.data));
        }, (error) => {

            this.hasErrors = true;
        })
    }

    onClickEditUser (id) {

        this.router.navigate(['/admin/usuarios/modificar', id]);
    }

    onClickCreateNewUser () {

        this.router.navigate(['/admin/usuarios/crear']);
    }

    onClickDeleteUser (user: User) {

        let didConfirm = confirm(`¿Esta seguro que quiere eliminar el usuario: ${user.name}?`);

        if (didConfirm) {
            
            this.userService.deleteUser(user.id).subscribe((response) => {

                this.store.dispatch(new UsersActions.DeleteUserSuccess(user.id));
            }, (error) => {

                alert(error.error.message);
            })
        }
    }
}
