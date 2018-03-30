import { Component, OnDestroy, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '@delifood/services/user.service';
import { ServerResponse } from '@delifood/interfaces/server-response.interface';
import { LoginCredentials } from '@delifood/interfaces/user.interface';

import * as fromRoot from '@delifood/store/reducers';
import * as UserActions from '@delifood/store/user/user.actions';
import { Store } from '@ngrx/store';

@Component({
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {

    loginForm: FormGroup;

    hasError: boolean = false;
    errorMessage?: string;
    
    constructor(
        private userService: UserService,
        private fb: FormBuilder,
        private store: Store<fromRoot.State>,
        private router: Router
    ){
        
        this.createForm();
    }
    
    createForm(): void {
        
        this.loginForm = this.fb.group({
            email: ['', {
                validators: [
                    Validators.required,
                    Validators.email
                ]
            }],
            password: ['', {
                validators: [
                    Validators.required,
                    Validators.minLength(6)
                ]
            }]
        });
    }

    ngOnInit () {

        document.getElementById('delifood-body').style.backgroundImage = `url('/assets/login-bg.jpg')`;
    }

    ngOnDestroy () {

        document.getElementById('delifood-body').style.backgroundImage = '';
    }
    
    onSubmit() {

        this.hasError = false;
        
        let credentials: LoginCredentials = this.getLoginCredentials();

        this.userService.login(credentials)
        .subscribe((response) => {

            let user = this.prepareUser(response);
            localStorage.setItem('user', JSON.stringify(user));
            this.store.dispatch(new UserActions.LoginSuccess(user));
            
            let destination = user.role === 'admin' ? '/admin/panel' : '/';
            this.router.navigateByUrl(destination);
        },(error) => {
        
            this.hasError = true;
            this.errorMessage = error.status === 0 ? 
                'No se pudo conectar con el servidor' :
                error.error.message; 
        });
    }

    onClickDeleteError () {

        this.hasError = false;
    }

    getLoginCredentials(): LoginCredentials {

        return {
            email: this.loginForm.get('email').value,
            password: this.loginForm.get('password').value
        };
    }
    
    private prepareUser (response: ServerResponse) {

        return {
            name: response.data.user.name,
            email:response.data.user.email,
            role: response.data.user.role,
            token: response.data.token
        };
    }
}