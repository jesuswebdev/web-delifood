import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CategoryService } from '@delifood/services/category.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'create-category.component.html'
})

export class CreateCategoryComponent implements OnInit {

    createCategoryForm: FormGroup;
    filename: string = '...';

    constructor(
        private fb: FormBuilder,
        private categoryService: CategoryService,
        private router: Router
    ) {

        this.createForm();
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

        document.getElementById('save-button').classList.add('is-loading');
        this.createCategoryForm.disable();
    }

    onDoneLoading() {

        document.getElementById('save-button').classList.remove('is-loading');
        this.createCategoryForm.enable();
    }

    ngOnInit() { }

    onSubmit() {
        
        this.onLoading();

        this.categoryService.createCategory(this.prepareCategory())
        .subscribe((response) => {
            
            this.onDoneLoading();
            this.router.navigate(['/admin/categorias']);
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
