import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { IsAdminGuard } from '@delifood/guards/isAdmin.guard';
import { IsGuestUserGuard } from '@delifood/guards/isGuestUser.guard';
import { IsAuthorizedUserGuard } from '@delifood/guards/isAuthorizedUser.guard';
import { AccountComponent } from './account/account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OrderListComponent } from '../order/list/order-list.component';
import { OrderDetailsComponent } from '../order/details/order-details.component';

const routes: Routes = [
  { path: 'admin', canLoad: [IsAdminGuard], loadChildren: '../admin/admin.module#AdminModule' },
  { path: 'comidas', loadChildren: '../product/product.module#ProductModule' },
  { path: 'carrito', loadChildren: '../cart/cart.module#CartModule' },
  // { path: 'pedidos', canActivate: [IsAuthorizedUserGuard],loadChildren: '../order/order.module#OrderModule' },
  { path: 'login', canActivate: [IsGuestUserGuard], component: LoginComponent },
  { path: 'cuenta', canActivate: [IsAuthorizedUserGuard], children: [
    { path: 'configuracion', component: AccountComponent },
    { path: 'pedidos', component: OrderListComponent },
    { path: 'pedidos/:id', component: OrderDetailsComponent },
    { path: 'contrasena', component: ChangePasswordComponent }
  ] },
  { path: 'registro', canActivate: [IsGuestUserGuard], component: RegisterComponent },
  { path: '', component: WelcomeComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule { }
