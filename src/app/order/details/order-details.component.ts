import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './order-details.component.html'
})
export class OrderDetailsComponent implements OnInit {

    id: string = '';

    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {

        this.route.params.subscribe((params) => {
            
            this.id = params['id'];
        });
    }
}
