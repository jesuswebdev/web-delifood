import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminProductsRoutingModule } from './admin-products-routing.module';
import { ManageProductsComponent } from './manage-products.component';
import { CreateProductComponent } from './create/create-product.component';
import { EditProductComponent } from './edit/edit-product.component';
import { ModalCreateCategoryComponent } from '../../shared/components/modal-create-category/modal-create-category.component';

@NgModule({
    declarations: [
        ManageProductsComponent,
        CreateProductComponent,
        EditProductComponent,
        ModalCreateCategoryComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AdminProductsRoutingModule
    ],
    exports: [],
    providers: [],
})
export class AdminProductsModule {}
