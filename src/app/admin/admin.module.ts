import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBarComponent } from '../shared/components/nav-bar/nav-bar.component';
import { ManageUsersComponent } from './users/manage-users.component'
import { ManageProductsComponent } from './products/manage-products.component'
import { ManageCategoriesComponent } from './categories/manage-categories.component'
import { ManageOrdersComponent } from './orders/manage-orders.component'


@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule
    ],
    exports: [],
    declarations: [
        AdminComponent,
        DashboardComponent,
        ManageUsersComponent,
        ManageProductsComponent,
        ManageCategoriesComponent,
        ManageOrdersComponent
    ],
    providers: [],
})
export class AdminModule { }
