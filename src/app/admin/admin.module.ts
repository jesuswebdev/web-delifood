import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule
    ],
    exports: [],
    declarations: [
        AdminComponent,
        DashboardComponent
    ],
    providers: [],
})
export class AdminModule { }
