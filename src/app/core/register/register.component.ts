import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { UserService } from '@delifood/services/user.service';
import { ServerResponse } from '@delifood/interfaces/server-response.interface';
import { RegistrationData } from '@delifood/interfaces/user.interface';

@Component({
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit,OnDestroy {

    registerForm: FormGroup;

    subscription: Subscription;
    hasError: boolean = false;
    errorMessage?: string;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router) {

        this.createForm();
    }

    createForm(){

        this.registerForm = this.fb.group({
            name: ['', { validators: [ 
                Validators.required,
                Validators.pattern(/^[a-zA-Z][a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]{4,64}/)
            ] }],
            email: ['', { validators: [
                Validators.email,
                Validators.required
            ] }],
            password: ['', { validators: [
                Validators.required,
                Validators.minLength(6)
            ] }]
        });
    }
    
    onSubmit(){

        this.onLoading();

        let userData: RegistrationData = this.prepareRegistration();
        
        this.subscription = this.userService.register(userData).subscribe(
            (response: ServerResponse) => {
                if (response.statusCode === 200) {
                    this.onDoneLoading();
                    this.router.navigate(['/login']);
                }
            },(error) => {

                this.hasError = true;
                this.onDoneLoading();
                this.errorMessage = error.status === 0 ? 
                'No se pudo conectar con el servidor' :
                error.error.message; 
            }
        );
    }

    onLoading () {

        document.getElementById('register-button').classList.add('is-loading');
        this.registerForm.disable();
    }

    onDoneLoading () {

        document.getElementById('register-button').classList.remove('is-loading');
        this.registerForm.enable();
    }

    prepareRegistration(): RegistrationData{

        return {
            name: this.registerForm.get('name').value,
            email: this.registerForm.get('email').value,
            password: this.registerForm.get('password').value
        };
    }

    onClickDeleteError () {

        this.hasError = false;
    }

    ngOnInit () {

        let body = document.getElementById('delifood-body').style;
        
        body.width                = '100%';
        body.position             = 'fixed';
        body.minHeight            = '100%';
        body.backgroundSize       = 'cover';
        body.backgroundImage      = `url('/assets/bg2.jpg')`;
        body.backgroundRepeat     = 'no-repeat';
        body.backgroundPosition   = 'center center';
        body.backgroundAttachment = 'fixed';
    }
    
    ngOnDestroy(){

        let body = document.getElementById('delifood-body').style;
        
        body.width                = '';
        body.position             = '';
        body.minHeight            = '';
        body.backgroundSize       = '';
        body.backgroundImage      = '';
        body.backgroundRepeat     = '';
        body.backgroundPosition   = '';
        body.backgroundAttachment = '';

        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
