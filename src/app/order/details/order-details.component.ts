import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromRoot from '@delifood/store/reducers';
import { Store } from '@ngrx/store';
import { Order } from '@delifood/store/order/order.model';
import { Subject } from 'rxjs/Subject';

@Component({
    templateUrl: './order-details.component.html'
})
export class OrderDetailsComponent implements OnInit, OnDestroy {

    order: Order;

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private route: ActivatedRoute,
        private store: Store<fromRoot.State>,
        private router: Router
    ) { }

    ngOnInit(): void {

        this.route.params.subscribe((params) => {
            
            this.store.select(state => state.order.orders)
                .takeUntil(this.destroy$)
                .subscribe((orders) => {
                    
                    if (orders.length === 0) {
                            this.router.navigate(['/pedidos']);
                        }
                    else {
                        this.order = orders.find(order => order._id === params['id']);
                    }
                });
        });
    }

    ngOnDestroy() {

        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
