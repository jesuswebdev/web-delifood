import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LogoutComponent } from './logout/logout.component';
import { IsAdminGuard } from '@delifood/guards/isAdmin.guard';
import { IsGuestUserGuard } from '@delifood/guards/isGuestUser.guard';
import { IsAuthorizedUserGuard } from '@delifood/guards/isAuthorizedUser.guard';

const routes: Routes = [
  { path: 'admin', canLoad: [IsAdminGuard], loadChildren: '../admin/admin.module#AdminModule' },
  { path: 'comidas', loadChildren: '../product/product.module#ProductModule' },
  { path: 'carrito', loadChildren: '../cart/cart.module#CartModule' },
  { path: 'pedidos', canActivate: [IsAuthorizedUserGuard],loadChildren: '../order/order.module#OrderModule' },
  { path: 'login', canActivate: [IsGuestUserGuard], component: LoginComponent },
  { path: 'registro', canActivate: [IsGuestUserGuard], component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '', component: WelcomeComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule { }
