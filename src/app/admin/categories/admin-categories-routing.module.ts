import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageCategoriesComponent } from './manage-categories.component';
import { CreateCategoryComponent } from './create/create-category.component';
import { EditCategoryComponent } from './edit/edit-category.component';

const routes: Routes = [
    { path: '', component: ManageCategoriesComponent },
    { path: 'crear', component: CreateCategoryComponent },
    { path: 'modificar/:id', component: EditCategoryComponent }
    // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminCategoriesRoutingModule {}
