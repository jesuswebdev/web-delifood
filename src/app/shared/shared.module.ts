import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartLabelComponent } from '../cart/cart-label/cart-label.component';
import { SearchBarComponent } from '../product/search-bar/search-bar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LogoutComponent } from '../core/logout/logout.component';

@NgModule({
    declarations: [
        NavBarComponent,
        FooterComponent,
        CartLabelComponent,
        SearchBarComponent,
        LogoutComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NavBarComponent,
        FooterComponent,
        SearchBarComponent
    ]

})

export class SharedModule {}
