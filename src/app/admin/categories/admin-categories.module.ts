import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminCategoriesRoutingModule } from './admin-categories-routing.module';
import { ManageCategoriesComponent } from './manage-categories.component';
import { CreateCategoryComponent } from './create/create-category.component';
import { EditCategoryComponent } from './edit/edit-category.component';

@NgModule({
    declarations: [
        ManageCategoriesComponent,
        CreateCategoryComponent,
        EditCategoryComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AdminCategoriesRoutingModule
    ],
    exports: [],
    providers: [],
})
export class AdminCategoriesModule {}
