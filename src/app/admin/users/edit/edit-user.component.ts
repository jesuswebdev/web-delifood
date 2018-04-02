import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import * as fromRoot from '@delifood/store/reducers';
import { User } from '@delifood/store/users/users.model';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@delifood/services/user.service';


@Component({
    templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit, OnDestroy {
    
    id: string;
    hasError: boolean = false;
    errorMessage: string = '';
    editUserForm: FormGroup;
    user: User;
    destroy$: Subject<boolean> = new Subject<boolean>();
    
    constructor(
        private route: ActivatedRoute,
        private store: Store<fromRoot.State>,
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router
    ) {

        this.createForm();
    }

    ngOnInit(): void {

        this.route.params
        .takeUntil(this.destroy$)
        .subscribe((params) => {
            
            this.store.select(fromRoot.selectUsers)
            .takeUntil(this.destroy$)
            .subscribe((users) => {
                
                if (users.length === 0) {
                    this.router.navigate(['/admin/usuarios']);
                }
                else {
                    this.user = users.find(user => user.id === params['id']);
                    this.id = params['id'];
                    this.prepareForm();
                }
            });
        });
    }

    createForm () {

        this.editUserForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            role: ['', Validators.required],
            banned: ['', Validators.required]
        });
    }

    prepareForm () {

        this.editUserForm.setValue({
            name: this.user.name || '',
            email: this.user.email || '',
            role: this.user.role || '',
            banned: this.user.banned === undefined ? '' : this.user.banned
        });
    }

    prepareUser () {

        return {
            id: this.id,
            name: this.editUserForm.get('name').value,
            email: this.editUserForm.get('email').value,
            role: this.editUserForm.get('role').value,
            banned: this.editUserForm.get('banned').value
        };
    }

    onSubmit () {

        this.userService.editUserInfo(this.prepareUser())
        .subscribe((response) => {
            
            this.router.navigate(['/admin/usuarios']);
        }, (error) => {
            
            this.hasError = true;
            this.errorMessage = error.error.message;
        });
    }

    onClickDeleteError () {

        this.hasError = false;
    }

    onClickCancel () {

        this.router.navigate(['/admin/usuarios']);
    }

    ngOnDestroy(): void {

        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    get role () { return this.editUserForm.get('role').value }
    get banned () { return this.editUserForm.get('banned').value }
}
