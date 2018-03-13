import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../../shared/services/user.service';
import { RegistrationData } from '../../shared/interfaces/registration-data.interface';

@Component({
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {

    loginForm: FormGroup;

    constructor(private fb: FormBuilder, private userService: UserService) {
        this.createForm();
    }

    ngOnInit() { }

    createForm(){
        this.loginForm = this.fb.group({
            name: ['', { validators: [ Validators.required, Validators.minLength(5) ] }],
            email: ['', { validators: [ Validators.email, Validators.required ] }],
            password: ['', { validators: [ Validators.required, Validators.minLength(6) ] }]
        });
    }

    onSubmit(){
        let userData = this.prepareRegistration();

        this.userService.register(userData).subscribe(
            (response)=>{
                console.log(response);
            });
    }

    prepareRegistration(): RegistrationData{
        let data = {
            name: this.loginForm.get('name').value,
            email: this.loginForm.get('email').value,
            password: this.loginForm.get('password').value
        };

        return data;
    }
}