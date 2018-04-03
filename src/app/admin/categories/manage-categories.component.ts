import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { CategoryService } from '@delifood/services/category.service';
import { Category } from '@delifood/store/category/category.model';

import * as fromRoot from '@delifood/store/reducers';
import * as CategoryActions from '@delifood/store/category/category.actions';

@Component({
    templateUrl: './manage-categories.component.html'
})
export class ManageCategoriesComponent implements OnInit {

    categories: Observable<Category[]>;
    count: Observable<number>;

    hasErrors: boolean = false;
    constructor(
        private router: Router,
        private categoryService: CategoryService,
        private store: Store<fromRoot.State>
    ) {

        this.categories = this.store.select(fromRoot.selectCategories);
        this.count = this.store.select(state => state.category.count);
    }

    ngOnInit(): void {

        this.hasErrors = false;
        
        this.categoryService.getCategories().subscribe((response) => {
            
            this.store.dispatch(new CategoryActions.GetCategoriesSuccess(response.data));
            this.store.dispatch(new CategoryActions.SetCategoriesCount(response.data.length));
        }, (error) => {

            this.hasErrors = true;
        });
    }

    onClickCreateCategory () {

        this.router.navigate(['/admin/categorias/crear']);
    }

    onClickEditCategory(id: string) {
        
        this.router.navigate(['/admin/categorias/modificar', id]);
    }

    onClickDeleteCategory(category) {

        let didConfirm = confirm(`¿Esta seguro que quiere eliminar la categoria: ${category.name}?`);
        
        if (didConfirm) {
            this.categoryService.deleteCategory(category.id)
            .subscribe((response) => {
    
                this.store.dispatch(new CategoryActions.DeleteCategorySuccess(category.id));
            }, (error) => {
    
                alert(error.error.message);
            });
        }
        
    }
}
