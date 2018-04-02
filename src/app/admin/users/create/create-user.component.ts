import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '@delifood/services/user.service';
import { RegistrationData } from '@delifood/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'create-user.component.html'
})

export class CreateUserComponent implements OnInit {
    
    userForm: FormGroup;
    hasError: boolean = false;
    errorMessage?: string = '';

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router
    ) {

        this.createForm();
    }

    createForm () {

        this.userForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(5)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            role: ['', Validators.required]
        });
    }

    onSubmit () {

        this.hasError = false;

        this.userService.register(this.prepareUser()).subscribe((response) => {

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
    
    prepareUser (): RegistrationData {
        
        return {
            name: this.userForm.get('name').value,
            email: this.userForm.get('email').value,
            password: this.userForm.get('password').value,
            role: this.userForm.get('role').value
        }
    }

    ngOnInit() { }
}
