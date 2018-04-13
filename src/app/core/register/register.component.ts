import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { UserService } from '@delifood/services/user.service';
import { ServerResponse } from '@delifood/interfaces/server-response.interface';
import { RegistrationData } from '@delifood/interfaces/user.interface';

import 'rxjs/add/operator/takeUntil'
import { Subject } from 'rxjs/Subject';

@Component({
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit,OnDestroy {

    registerForm: FormGroup;
    
    hasError: boolean = false;
    errorMessage?: string;

    isLoading: boolean = false;
    destroy$: Subject<boolean> = new Subject<boolean>();

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
                Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\.]+$/),
                Validators.minLength(4),
                Validators.maxLength(64)
            ] }],
            email: ['', { validators: [
                Validators.email,
                Validators.required
            ] }],
            password: ['', { validators: [
                Validators.required,
                Validators.minLength(6),
                Validators.pattern(/^[a-zA-Z0-9\.\_]+$/)
            ] }]
        });
    }
    
    onSubmit(){

        this.onLoading();

        let userData: RegistrationData = this.prepareRegistration();
        
        this.userService.register(userData)
        .takeUntil(this.destroy$)
        .subscribe(
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
        
        this.isLoading = true;
    }

    onDoneLoading () {
        
        this.isLoading = false;
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
    }
    
    ngOnDestroy(){

        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    get name() { return this.registerForm.get('name'); }
    get email() { return this.registerForm.get('email'); }
    get password() { return this.registerForm.get('password'); }
}
