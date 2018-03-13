import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule
    ],
    exports: [],
    declarations: [
        AdminComponent,
        DashboardComponent
    ],
    providers: [],
})
export class AdminModule { }
