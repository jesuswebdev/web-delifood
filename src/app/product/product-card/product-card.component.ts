import { Component, OnInit, Input } from '@angular/core';
import { Product } from '@delifood/store/product/product.model';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

@Component({
    selector: 'delifood-product-card',
    templateUrl: './product-card.component.html'
})
export class ProductCardComponent implements OnInit {
    
    apiUrl: string = environment.API_URL;

    @Input() product: Product;

    constructor(
        private router: Router
    ) { }

    onClickDetails(slug: string) {

        this.router.navigate(['/comidas', slug]);
    }

    ngOnInit(): void { }
}
