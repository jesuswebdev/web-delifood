import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../../shared/services/user.service';
import { LoginData } from '../../shared/interfaces/login-data.interface';
import { ServerResponse } from '../../shared/interfaces/server-response.interface';

import { Store } from '@ngrx/store';
import { ApplicationState } from '../../shared/store/application.state';

@Component({
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnDestroy {

    loginForm: FormGroup;

    subscription: Subscription;
    
    constructor(
        private userService: UserService,
        private fb: FormBuilder,
        private store: Store<ApplicationState>
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

     onSubmit(): void {

        let userData: LoginData = this.prepareLogin();

        this.subscription = this.userService
                            .login(userData)
                            .subscribe((response: ServerResponse) => {

                                let test = {
                                    name: response.data.user.name,
                                    email: response.data.user.email,
                                    role: response.data.user.role,
                                    token: response.data.token
                                };
                                
                                this.store.dispatch({ type: 'LOGIN', payload: test });
                            });

     }

     prepareLogin(): LoginData {

        let data: LoginData = {
            email: this.loginForm.get('email').value,
            password: this.loginForm.get('password').value
        };

        return data;

     }

    ngOnDestroy(): void {

        if (this.subscription) {
            
            this.subscription.unsubscribe();

        }

    }
}