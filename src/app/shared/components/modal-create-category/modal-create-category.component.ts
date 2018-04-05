import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as ProductActions from '@delifood/store/product/product.actions';
import * as CategoryActions from '@delifood/store/category/category.actions';
import * as fromRoot from '@delifood/store/reducers';
import { Observable } from 'rxjs/Observable';
import { CategoryService } from '@delifood/services/category.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
    selector: 'delifood-modal-create-category',
    templateUrl: './modal-create-category.component.html'
})
export class ModalCreateCategoryComponent implements OnInit {

    modal: Observable<boolean>;

    createCategoryForm: FormGroup;
    filename: string = '...';

    constructor(
        private fb: FormBuilder,
        private categoryService: CategoryService,
        private store: Store<fromRoot.State>
    ) {

        this.modal = this.store.select(state => state.product.createCategoryModal);
        this.createForm();
    }

    ngOnInit(): void {

        this.modal.subscribe((value) => {

            let modal = document.getElementById('create-category-modal').classList;

            value ?
            modal.add('is-active') :
            modal.remove('is-active');
        })
    }

    onCloseModal() {

        this.store.dispatch(new ProductActions.DismissModal());
    }

    createForm() {

        this.createCategoryForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            img: null
        });
    }

    onFileChange(event) {
        
        if (event.target.files.length > 0) {
            this.createCategoryForm.get('img').setValue(event.target.files[0]);
            this.filename = event.target.files[0].name;
        }
    }

    onLoading() {

        document.getElementById('modal-save-button').classList.add('is-loading');
        this.createCategoryForm.disable();
    }

    onDoneLoading() {

        document.getElementById('modal-save-button').classList.remove('is-loading');
        this.createCategoryForm.enable();
    }

    onSubmit() {
        
        this.onLoading();

        this.categoryService.createCategory(this.prepareCategory())
        .subscribe((response) => {
            
            this.store.dispatch(new CategoryActions.CreateCategorySuccess(response.data));
            this.onDoneLoading();
            this.onCloseModal();
        }, (error) => {

            this.onDoneLoading();
            console.log(error);
        });
    }

    prepareCategory() {

        let category = new FormData();
        category.append('name', this.createCategoryForm.get('name').value);
        category.append('description', this.createCategoryForm.get('description').value);
        category.append('img', this.createCategoryForm.get('img').value);

        return category;
    }
}
