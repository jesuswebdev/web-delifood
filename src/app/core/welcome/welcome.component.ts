import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    templateUrl: 'welcome.component.html'
})

export class WelcomeComponent implements OnInit, OnDestroy {

    ngOnInit () {
        
        document.getElementById('delifood-body').style.backgroundImage = `url('/assets/bg1.jpg')`;
    }

    ngOnDestroy () {

        document.getElementById('delifood-body').style.backgroundImage = '';
    }
}