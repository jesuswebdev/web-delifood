import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageUsersComponent } from './manage-users.component';
import { CreateUserComponent } from './create/create-user.component';
import { EditUserComponent } from './edit/edit-user.component';

const routes: Routes = [
    { path: '', component: ManageUsersComponent },
    { path: 'crear', component: CreateUserComponent },
    { path: 'modificar/:id', component: EditUserComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminUsersRoutingModule { }
