import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { ManageUsersComponent } from './users/manage-users.component';


const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: 'usuarios', loadChildren: './users/admin-users.module#AdminUsersModule' },
            // { path: 'comidas', component: ManageProductsComponent, children: [] },
            // { path: 'categorias', component: ManageCategoriesComponent, children: [] },
            // { path: 'ordenes', component: ManageOrdersComponent, children: [] },
            { path: '', redirectTo: 'panel', pathMatch: 'full' },
            { path: 'panel', component: DashboardComponent }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
