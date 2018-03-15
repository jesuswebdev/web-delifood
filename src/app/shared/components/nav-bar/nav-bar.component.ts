import { Component, OnInit, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

import { ApplicationState } from '../../store/application.state';
import { UserState } from '../../store/user.state';

@Component({
    selector: 'nav-bar-component',
    templateUrl: 'nav-bar.component.html'
    //changeDetection: ChangeDetectionStrategy.OnPush
})

export class NavBarComponent implements OnChanges {

    user?: UserState;
    zzz$?: Observable<string>;

    constructor(
        private store: Store<ApplicationState>
    ){
        this.store.pipe(select('user')).subscribe((res: ApplicationState)=>{
            this.user = res.userState;
            console.log(res)
        });//.subscribe((res)=>{console.log(res)});

        this.zzz$ = store.select(state => state.userState.email);
            
        // this.zzz$ = this.store.select((state)=>{ return state.userState }).subscribe();
        // console.log(this.zzz$);
        
        // this.store.pipe(select('user')).subscribe(
        //     (response: ApplicationState) => {
        //         console.log(response);
        //         this.user = response.userState;
        //         console.log(this.user);
        //     }
        // )
    }

    ngOnChanges() {
        console.log('AAAAAAAAAAAAA');
    }
    
}