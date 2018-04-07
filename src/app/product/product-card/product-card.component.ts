import { Component, OnInit, Input } from '@angular/core';
import { Product } from '@delifood/store/product/product.model';
import { Router } from '@angular/router';

@Component({
    selector: 'delifood-product-card',
    templateUrl: './product-card.component.html'
})
export class ProductCardComponent implements OnInit {
    
    @Input() product: Product;

    constructor(
        private router: Router
    ) { }

    onClickDetails(slug: string) {

        this.router.navigate(['/comidas', slug]);
    }

    onAddToCart(product: Product) {

        console.log(product);
    }

    ngOnInit(): void { }
}
