import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { Category } from '@delifood/store/category/category.model';
import { Subject } from 'rxjs/Subject';
import * as fromRoot from '@delifood/store/reducers';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/takeUntil';
import { CategoryService } from '@delifood/services/category.service';

@Component({
    templateUrl: './edit-category.component.html'
})
export class EditCategoryComponent implements OnInit, OnDestroy {

    id: string;
    category: Category;
    destroy$: Subject<boolean> = new Subject<boolean>();
    imagen: File;
    filename: string = '...';


    editCategoryForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private store: Store<fromRoot.State>,
        private categoryService: CategoryService,
        private router: Router
    ) {

        this.createForm()
    }

    createForm() {

        this.editCategoryForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            img: null
        });
    }

    onLoading() {

        document.getElementById('save-button').classList.add('is-loading');
        this.editCategoryForm.disable();
    }

    onDoneLoading() {
    
        document.getElementById('save-button').classList.remove('is-loading');
        this.editCategoryForm.enable();
    }

    onFileChange(event) {
        
        if (event.target.files.length > 0) {
            this.editCategoryForm.get('img').setValue(event.target.files[0]);
            this.filename = event.target.files[0].name;
        }
    }

    loadFormData() {

        this.editCategoryForm.setValue({
            name: this.category.name || '',
            description: this.category.description || '',
            img: this.category.img || null
        });
    }

    prepareCategory() {

        let category: FormData = new FormData();
        category.append('name', this.editCategoryForm.get('name').value);
        category.append('description', this.editCategoryForm.get('description').value);
        (this.filename != '...') ?
        category.append('img', this.editCategoryForm.get('img').value) : '';

        return category;
    }

    onSubmit() {

        this.categoryService.editCategory(this.prepareCategory(), this.category.id)
        .takeUntil(this.destroy$)
        .subscribe((response) => {
            
            this.router.navigate(['/admin/categorias']);
        }, (error) => {

            console.log(error);
            alert(error.error.message);
        });
    }

    ngOnInit(): void {
        
        this.route.params.takeUntil(this.destroy$)
        .subscribe((params) => {

            this.store.select(fromRoot.selectCategories).takeUntil(this.destroy$)
            .subscribe((categories) => {

                if (categories.length === 0) {
                    this.router.navigate(['/admin/categorias']);
                    return;
                }
                else {
                    this.category = categories.find(category => category.id === params['id']);
                    this.loadFormData();
                }
            });
        });
    }

    ngOnDestroy() {

        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
