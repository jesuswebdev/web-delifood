import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { User } from '@delifood/store/user/user.model';
import { UserService } from '@delifood/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: './account.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit {

    user: User;

    accountDetailsForm: FormGroup;

    constructor(
        private userService: UserService,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef
    ) {
        this.createForm();
    }

    createForm() {

        this.accountDetailsForm = this.fb.group({
            name: ['', Validators.required],
            phone: [''],
            address: ['']
        })
    }

    ngOnInit(): void {

        this.user = this.userService.getStoredUserInfo();

        this.accountDetailsForm.setValue({
            name: this.user.name,
            address: this.user.address,
            phone: this.user.phone
        })

        this.cd.markForCheck();
    }
}
