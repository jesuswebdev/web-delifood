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
        
        let body = document.getElementById('delifood-body').style;
        
        body.width                = '100%';
        body.position             = 'fixed';
        body.minHeight            = '100%';
        body.backgroundSize       = 'cover';
        body.backgroundImage      = `url('/assets/login-bg.jpg')`;
        body.backgroundRepeat     = 'no-repeat';
        body.backgroundPosition   = 'center center';
        body.backgroundAttachment = 'fixed';
    }

    ngOnDestroy () {
        
        let body = document.getElementById('delifood-body').style;
        
        body.width                = '';
        body.position             = '';
        body.minHeight            = '';
        body.backgroundSize       = '';
        body.backgroundImage      = '';
        body.backgroundRepeat     = '';
        body.backgroundPosition   = '';
        body.backgroundAttachment = '';
    }
    
    onSubmit() {

        this.hasError = false;
        this.onLoading();
        
        let credentials: LoginCredentials = this.getLoginCredentials();

        this.userService.login(credentials)
        .subscribe((response) => {

            let user = this.prepareUser(response);
            localStorage.setItem('user', JSON.stringify(user));
            this.store.dispatch(new UserActions.LoginSuccess(user));
            let destination = user.role === 'admin' ? '/admin/panel' : '/';
            this.onDoneLoading();
            this.router.navigate([destination]);
        },(error) => {
        
            this.hasError = true;
            this.onDoneLoading();
            this.errorMessage = error.status === 0 ? 
                'No se pudo conectar con el servidor' :
                error.error.message; 
        });
    }

    onLoading () {

        document.getElementById('login-button').classList.add('is-loading');
        this.loginForm.disable();
    }

    onDoneLoading () {

        document.getElementById('login-button').classList.remove('is-loading');
        this.loginForm.enable();
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
