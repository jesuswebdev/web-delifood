import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CoreRoutingModule } from './core-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavBarComponent } from '../shared/components/nav-bar/nav-bar.component';

import { UserService } from '../shared/services/user.service';
import { ServerService } from '../shared/services/server.service';
import { StoreModule } from '@ngrx/store';
import { userReducer } from '../shared/store/user.reducer';


@NgModule({
    imports: [
        CommonModule,
        CoreRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        StoreModule.forRoot({ user: userReducer })
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        WelcomeComponent,
        LoginComponent,
        RegisterComponent,
        PageNotFoundComponent,
        NavBarComponent
    ],
    providers: [
        UserService,
        ServerService
    ],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule){
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
 }
