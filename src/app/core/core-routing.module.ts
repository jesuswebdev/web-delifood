import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LogoutComponent } from './logout/logout.component';
import { LoggedInGuard } from '@delifood/guards/loggedIn.guard';
import { IsAdminGuard } from '@delifood/guards/isAdmin.guard';

const routes: Routes = [
  { path: 'admin', canLoad: [IsAdminGuard], loadChildren: '../admin/admin.module#AdminModule' },
  // { path: 'productos', loadChildren: '' },
  // { path: 'pedidos', loadChildren: '' },
  // { path: 'categorias', loadChildren: '' },
  { path: 'login', canActivate: [LoggedInGuard], component: LoginComponent },
  { path: 'registro', canActivate: [LoggedInGuard], component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '', component: WelcomeComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule { }