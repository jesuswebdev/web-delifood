import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { ManageUsersComponent } from './users/manage-users.component';
import { ManageProductsComponent } from './products/manage-products.component';
import { ManageCategoriesComponent } from './categories/manage-categories.component';
import { ManageOrdersComponent } from './orders/manage-orders.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: 'usuarios', component: ManageUsersComponent, children: [] },
            { path: 'comidas', component: ManageProductsComponent, children: [] },
            { path: 'categorias', component: ManageCategoriesComponent, children: [] },
            { path: 'ordenes', component: ManageOrdersComponent, children: [] },
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
