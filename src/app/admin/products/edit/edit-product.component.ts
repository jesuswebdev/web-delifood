import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/takeUntil';

import * as fromRoot from '@delifood/store/reducers';
import * as ProductActions from '@delifood/store/product/product.actions';
import * as CategoryActions from '@delifood/store/category/category.actions';
import { CategoryService } from '@delifood/services/category.service';
import { Category } from '@delifood/store/category/category.model';
import { ProductService } from '@delifood/services/product.service';
import { Product } from '@delifood/store/product/product.model';

@Component({
    templateUrl: './edit-product.component.html'
})
export class EditProductComponent implements OnInit, OnDestroy {
    
    productId: string;
    editProductForm: FormGroup;
    categories: Observable<Category[]>;
    product: Product;
    
    filename: string = '...';

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private fb: FormBuilder,
        private store: Store<fromRoot.State>,
        private categoryService: CategoryService,
        private productService: ProductService,
        private router: Router,
        private route: ActivatedRoute
    ) {

        this.createForm();
        this.categories = this.store.select(fromRoot.selectCategories);
    }

    createForm() {

        this.editProductForm = this.fb.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            price: ['', [Validators.required, Validators.min(1)]],
            category: ['', [Validators.required]],
            img: null
        });
    }

    onFileChange(event) {

        if (event.target.files.length > 0) {
            this.editProductForm.get('img').setValue(event.target.files[0]);
            this.filename = event.target.files[0].name;
        }
    }

    ngOnInit(): void {

        this.onLoading();

        this.categoryService.getCategories()
        .takeUntil(this.destroy$)
        .subscribe((response) => {
            
            this.store.dispatch(new CategoryActions.GetCategoriesSuccess(response.data));
        }, (error) => {

            console.log(error);
        });

        this.route.params
        .takeUntil(this.destroy$)
        .subscribe((params) => {

            this.productId = params['id'];
            this.store.select(fromRoot.selectProducts)
            .takeUntil(this.destroy$)
            .subscribe((products) => {

                this.product = products.find(product => product.id === this.productId);
                this.prepareForm();
                this.onDoneLoading();
            });
        })
    }

    prepareForm() {

        this.editProductForm.setValue({
            name: this.product.name || '',
            description: this.product.description || '',
            price: this.product.price || '',
            category: this.product.category.id || '',
            img: this.product.img || null
        });
    }

    prepareProduct() {

        let product = new FormData();

        product.append('name', this.editProductForm.get('name').value);
        product.append('description', this.editProductForm.get('description').value);
        product.append('price', this.editProductForm.get('price').value);
        product.append('category', this.editProductForm.get('category').value);
        (this.filename != '...') ?
        product.append('img', this.editProductForm.get('img').value) : '';

        return product;
    }

    onCreateCategory() {

        this.store.dispatch(new ProductActions.ActivateModal());
    }

    onLoading() {

        document.getElementById('save-product-button').classList.add('is-loading');
        this.editProductForm.disable();
    }

    onDoneLoading() {

        document.getElementById('save-product-button').classList.remove('is-loading');
        this.editProductForm.enable();
    }

    onSaveProduct() {

        this.onLoading();

        this.productService.updateProduct(this.productId, this.prepareProduct())
        .takeUntil(this.destroy$)
        .subscribe((response) => {

            this.onDoneLoading();
            this.router.navigate(['/admin/comidas']);
        }, (error) => {

            this.onDoneLoading();
            console.log(error);
        });
    }

    ngOnDestroy() {

        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
