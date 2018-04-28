import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '@delifood/services/user.service';
import { AuthService } from 'angularx-social-login';



@Component({
    templateUrl: './logout.component.html'
})

export class LogoutComponent implements OnInit {

    constructor (
        private userService: UserService,
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        
        this.userService.logout();
        this.authService.signOut().then(
            () => { console.log('signed out');this.router.navigate(['/']); },
            () => { console.log('rejected');this.router.navigate(['/']); }
        ).catch(err => console.log(err));      
    }
}
