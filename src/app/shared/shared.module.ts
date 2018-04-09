import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartLabelComponent } from '../cart/cart-label/cart-label.component';

@NgModule({
    declarations: [
        NavBarComponent,
        FooterComponent,
        CartLabelComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        NavBarComponent,
        FooterComponent
    ]

})

export class SharedModule {}
