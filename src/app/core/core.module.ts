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
import { TokenInterceptor } from '../utils/interceptors/token.interceptor';

import { UserService } from '@delifood/services/user.service';
import { ServerService } from '@delifood/services/server.service';
import { CategoryService } from '@delifood/services/category.service';
import { ProductService } from '@delifood/services/product.service';
import { AuthService } from '@delifood/services/auth.service';

import { StoreModule } from '@ngrx/store';
import { reducers } from '@delifood/store/reducers';

import { IsAdminGuard } from '@delifood/guards/isAdmin.guard';
import { OrderService } from '@delifood/services/order.service';
import { IsAuthorizedUserGuard } from '@delifood/guards/isAuthorizedUser.guard';
import { IsGuestUserGuard } from '@delifood/guards/isGuestUser.guard';

import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, LoginOpt } from 'angularx-social-login';
import { environment } from 'environments/environment';
import { AccountComponent } from './account/account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OrderListComponent } from '../order/list/order-list.component';
import { OrderDetailsComponent } from '../order/details/order-details.component';

const googleLoginOptions: LoginOpt = {
    scope: 'profile email'
}

let config = new AuthServiceConfig([
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider(environment.facebookId)
    },
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(environment.googleId, googleLoginOptions)
    }
]);

export function provideConfig() {
    return config;
}

@NgModule({
    imports: [
        CommonModule,
        CoreRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        HttpClientModule,
        StoreModule.forRoot(reducers),
        SocialLoginModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        WelcomeComponent,
        LoginComponent,
        RegisterComponent,
        PageNotFoundComponent,
        AccountComponent,
        ChangePasswordComponent,
        OrderListComponent,
        OrderDetailsComponent
    ],
    providers: [
        AuthService,
        UserService,
        CategoryService,
        ProductService,
        OrderService,
        ServerService,
        { 
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        IsAuthorizedUserGuard,
        IsGuestUserGuard,
        IsAdminGuard,
        {
            provide: AuthServiceConfig,
            useFactory: provideConfig
        }
    ],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule){
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
 }
