import { Component, OnDestroy, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '@delifood/services/user.service';
import { ServerResponse } from '@delifood/interfaces/server-response.interface';
import { LoginCredentials } from '@delifood/interfaces/user.interface';

import * as fromRoot from '@delifood/store/reducers';
import * as UserActions from '@delifood/store/user/user.actions';
import { Store } from '@ngrx/store';
import { AuthService, FacebookLoginProvider, SocialUser, GoogleLoginProvider } from 'angularx-social-login';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component({
    templateUrl: 'login.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})

export class LoginComponent implements OnInit, OnDestroy {

    loginForm: FormGroup;
    isLoading: boolean = false;

    hasError: boolean = false;
    errorMessage?: string;

    destroy$: Subject<boolean> = new Subject<boolean>();

    loadingFacebook: boolean = false;
    loadingGoogle: boolean = false;
    loadingNormal: boolean = false;
    
    constructor(
        private userService: UserService,
        private fb: FormBuilder,
        private store: Store<fromRoot.State>,
        private router: Router,
        private authService: AuthService
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
                    Validators.pattern(/^[a-zA-Z0-9\.\_]+$/),
                    Validators.minLength(6)
                ]
            }]
        });
    }

    ngOnInit () { }

    ngOnDestroy () {

        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
    
    onSubmit() {

        this.hasError = false;
        this.onLoading();
        this.loadingNormal = true;
        
        let credentials: LoginCredentials = this.getLoginCredentials();

        this.userService.login(credentials)
        .takeUntil(this.destroy$)
        .subscribe((response) => {
            
            this.setUserFromServerResponse(response);
        },(error) => {
            
            this.showErrorFromServerResponse(error);
        });
    }

    facebookLogin() {
        
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
        .then(user => {

            if (!this.isLoading) {
                this.onLoading();
                this.loadingFacebook = true;

                this.userService.loginWithFacebook({ token: user.authToken })
                .takeUntil(this.destroy$)
                .subscribe(response => {
                    
                    this.setUserFromServerResponse(response);
                },
                err => {
                    this.showErrorFromServerResponse(err);
                });
            }
        },
        reason => { console.log('rejected', reason); })
        .catch(err => console.log(err));
    }

    googleLogin() {

        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
        .then(user => {
            if (!this.isLoading) {
                this.onLoading();
                this.loadingGoogle = true;
                
                this.userService.loginWithGoogle({ token: user.idToken })
                .takeUntil(this.destroy$)
                .subscribe(response => {
                    this.setUserFromServerResponse(response);
                }, err => {
                    this.showErrorFromServerResponse(err);
                });
            }
        },
        reason => { console.log('rejected', reason); })
        .catch(err => console.log(err));
    }

    onLoading () {
        this.isLoading = true;
    }

    onDoneLoading () {

        this.isLoading = false;
        this.loadingFacebook = false;
        this.loadingGoogle = false;
        this.loadingNormal = false;
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

    private setUserFromServerResponse (response) {

        let user = this.prepareUser(response);
        localStorage.setItem('user', JSON.stringify(user));
        this.store.dispatch(new UserActions.LoginSuccess(user));
        let destination = user.role === 'admin' ? '/admin/panel' : '/';
        this.onDoneLoading();
        this.router.navigate([destination]);
    }

    private showErrorFromServerResponse (error) {

        this.hasError = true;
        this.onDoneLoading();
        this.errorMessage = error.status === 0 ? 
            'No se pudo conectar con el servidor' :
            error.error.message;
    }
    
    private prepareUser (response: ServerResponse) {
        
        return {
            name: response.data.user.name,
            email:response.data.user.email,
            role: response.data.user.role,
            token: response.data.token,
            address: response.data.address || '',
            phone: response.data.phone || ''
        };
    }

    get email() { return this.loginForm.get('email'); }
    get password() { return this.loginForm.get('password'); }
}
