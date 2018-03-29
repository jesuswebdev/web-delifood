import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { UserService } from '../../shared/services/user.service';
import { ServerResponse } from '../../shared/interfaces/server-response.interface';
import { RegistrationData } from '@delifood/interfaces/user.interface';

@Component({
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnDestroy {

    registerForm: FormGroup;

    subscription: Subscription;

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

        let userData: RegistrationData = this.prepareRegistration();
        
        this.subscription = this.userService.register(userData).subscribe(
            (response: ServerResponse)=>{
                if (response.statusCode === 201) {
                    this.router.navigate(['/login']);
                }
            });

    }

    prepareRegistration(): RegistrationData{

        let data = {
            name: this.registerForm.get('name').value,
            email: this.registerForm.get('email').value,
            password: this.registerForm.get('password').value
        };

        return data;

    }

    ngOnDestroy(){

        if (this.subscription) {
            
            this.subscription.unsubscribe();

        }
        
    }
}