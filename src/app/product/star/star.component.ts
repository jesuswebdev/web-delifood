import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy, OnChanges } from '@angular/core';

@Component({
    selector: 'delifood-star',
    templateUrl: './star.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class StarComponent implements OnInit, OnChanges {

    @Input() rating: number;

    stars: Array<{ complete: boolean, yellow: boolean }> = [
        { complete: true, yellow: false },
        { complete: true, yellow: false },
        { complete: true, yellow: false },
        { complete: true, yellow: false },
        { complete: true, yellow: false }
    ];
    incompleteStar: number;
    greyStars: Array<any> = [];

    constructor(
        private cd: ChangeDetectorRef
    ) { }

    ngOnInit(): void {


        this.calculateStars();

        // console.log(this.rating);

        // this.stars.length = Math.floor(this.rating);
        // this.stars = this.stars.fill(0);
        // let resto = this.rating - Math.floor(this.rating);
        // this.incompleteStar = resto > 0 ? resto : null;
        // this.greyStars.length = 5 - Math.ceil(this.rating);
        // this.greyStars.fill(0);
        this.cd.markForCheck();
    }

    ngOnChanges() {
        
        // console.log(this.rating);

        // this.stars.length = Math.floor(this.rating);
        // this.stars = this.stars.fill(0);
        // let resto = this.rating - Math.floor(this.rating);
        // this.incompleteStar = resto > 0 ? resto : null;
        // this.greyStars.length = 5 - Math.ceil(this.rating);
        // this.greyStars.fill(0);

        this.resetStars();
        this.calculateStars();
        this.cd.markForCheck();
    }

    calculateStars () {

        for (let i = 0; i < 5; i++) {
            if (this.rating >= i + 1) {
                this.stars[i].yellow = true;
            }
            else if (this.rating > i && this.rating < i + 1) {
                this.stars[i].complete = false;
            }
            else {
                this.stars[i].yellow = false;
            }
        }
    }

    resetStars() {
        this.stars = [
            { complete: true, yellow: false },
            { complete: true, yellow: false },
            { complete: true, yellow: false },
            { complete: true, yellow: false },
            { complete: true, yellow: false }
        ];
    }
}
