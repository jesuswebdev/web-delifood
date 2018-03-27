import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '@delifood/services/user.service';



@Component({
    templateUrl: './logout.component.html'
})

export class LogoutComponent implements OnInit {

    constructor (private userService: UserService, private router: Router) {}

    ngOnInit(): void {
        this.userService.logout();
        setTimeout(()=>{this.router.navigate(['/']);},1000);        
    }
}