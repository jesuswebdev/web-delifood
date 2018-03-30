import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {

    money: number = 123456789;

    constructor() { }

    ngOnInit() { }
}
