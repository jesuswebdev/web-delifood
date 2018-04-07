import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as fromRoot from '@delifood/store/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Category } from '@delifood/store/category/category.model';
import { CategoryService } from '@delifood/services/category.service';
import * as CategoryActions from '@delifood/store/category/category.actions';
import * as ProductActions from '@delifood/store/product/product.actions';
import { ProductService } from '@delifood/services/product.service';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import 'rxjs/add/operator/takeUntil';

@Component({
    templateUrl: './create-product.component.html'
})
export class CreateProductComponent implements OnInit, OnDestroy {

    createProductForm: FormGroup;
    categories: Observable<Category[]>;
    
    filename: string = '...';

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private fb: FormBuilder,
        private store: Store<fromRoot.State>,
        private categoryService: CategoryService,
        private productService: ProductService,
        private router: Router
    ) {

        this.createForm();
        this.categories = this.store.select(fromRoot.selectCategories);
    }

    createForm() {

        this.createProductForm = this.fb.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            price: ['', [Validators.required, Validators.min(1)]],
            category: ['', [Validators.required]],
            img: [null]
        });
    }

    onFileChange(event) {
        
        if (event.target.files.length > 0) {
            this.createProductForm.get('img').setValue(event.target.files[0]);
            this.filename = event.target.files[0].name;
        }
    }

    ngOnInit(): void {

        this.categoryService.getCategories()
        .takeUntil(this.destroy$)
        .subscribe((response) => {
            
            this.store.dispatch(new CategoryActions.GetCategoriesSuccess(response.data));
        }, (error) => {

            console.log(error);
        });
    }

    prepareProduct() {

        let product = new FormData();

        product.append('name', this.createProductForm.get('name').value);
        product.append('description', this.createProductForm.get('description').value);
        product.append('price', this.createProductForm.get('price').value);
        product.append('category', this.createProductForm.get('category').value);
        product.append('img', this.createProductForm.get('img').value);

        return product;
    }

    onCreateCategory() {

        this.store.dispatch(new ProductActions.ActivateModal());
    }

    onLoading() {

        document.getElementById('save-product-button').classList.add('is-loading');
        this.createProductForm.disable();
    }

    onDoneLoading() {

        document.getElementById('save-product-button').classList.remove('is-loading');
        this.createProductForm.enable();
    }

    onCreateProduct() {

        this.onLoading();

        this.productService.createProduct(this.prepareProduct())
        .takeUntil(this.destroy$)
        .subscribe((response) => {

            this.onDoneLoading();
            this.router.navigate(['/admin/comidas']);
        }, (error) => {

            this.onDoneLoading();
            console.log(error);
        });
    }

    onClickCancel() {

        this.router.navigate(['/admin/comidas']);
    }

    ngOnDestroy() {

        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
