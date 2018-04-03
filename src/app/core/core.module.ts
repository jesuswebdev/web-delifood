import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { LogoutComponent } from './logout/logout.component';
import { TokenInterceptor } from '../utils/interceptors/token.interceptor';

import { UserService } from '@delifood/services/user.service';
import { ServerService } from '@delifood/services/server.service';
import { CategoryService } from '@delifood/services/category.service';

import { StoreModule } from '@ngrx/store';
import { reducers } from '@delifood/store/reducers';
import { AuthService } from '@delifood/services/auth.service';

import { LoggedInGuard } from '@delifood/guards/loggedIn.guard';
import { IsAdminGuard } from '@delifood/guards/isAdmin.guard';


@NgModule({
    imports: [
        CommonModule,
        CoreRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        HttpClientModule,
        StoreModule.forRoot(reducers)
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        WelcomeComponent,
        LoginComponent,
        RegisterComponent,
        LogoutComponent,
        PageNotFoundComponent
    ],
    providers: [
        AuthService,
        UserService,
        CategoryService,
        ServerService,
        { 
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        LoggedInGuard,
        IsAdminGuard
    ],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule){
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
 }
