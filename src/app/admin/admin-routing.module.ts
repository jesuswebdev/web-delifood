import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';


const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: 'usuarios', loadChildren: './users/admin-users.module#AdminUsersModule' },
            { path: 'comidas', loadChildren: './products/admin-products.module#AdminProductsModule' },
            { path: 'categorias', loadChildren: './categories/admin-categories.module#AdminCategoriesModule' },
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
