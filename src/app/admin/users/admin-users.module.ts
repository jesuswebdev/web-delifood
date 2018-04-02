import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUsersRoutingModule } from './admin-users-routing.module';

import { ManageUsersComponent } from './manage-users.component';
import { CreateUserComponent } from './create/create-user.component';
import { EditUserComponent } from './edit/edit-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        ManageUsersComponent,
        CreateUserComponent,
        EditUserComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AdminUsersRoutingModule
    ],
    exports: [],
    providers: [],
})
export class AdminUsersModule {}
