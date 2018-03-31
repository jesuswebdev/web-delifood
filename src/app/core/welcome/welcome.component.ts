import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    templateUrl: 'welcome.component.html'
})

export class WelcomeComponent implements OnInit, OnDestroy {

    ngOnInit () {

        let body = document.getElementById('delifood-body').style;
        
        body.width                = '100%';
        body.position             = 'fixed';
        body.minHeight            = '100%';
        body.backgroundSize       = 'cover';
        body.backgroundImage      = `url('/assets/bg1.jpg')`;
        body.backgroundRepeat     = 'no-repeat';
        body.backgroundPosition   = 'center center';
        body.backgroundAttachment = 'fixed';
    }

    ngOnDestroy () {
        
        let body = document.getElementById('delifood-body').style;
        
        body.width                = '';
        body.position             = '';
        body.minHeight            = '';
        body.backgroundSize       = '';
        body.backgroundImage      = '';
        body.backgroundRepeat     = '';
        body.backgroundPosition   = '';
        body.backgroundAttachment = '';
    }
}
