import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ServerService {

    constructor() {}

    private guestToken: string = 'Fe26.2**edbf5fa561bd037811e90833c31b4666cecdbc62cdb9e0c36e3b039201375205*SriKon8DHQ5qbUPZuBdEmw*3KgCe25MHgIJsYLCwKjdGYUmVabHzEpHP_FLoX-UPR8**a5e3f765f7bb2226dce4033d109c19e3a947c8af98a3f2ed4da57a4a878d227d*FxOtzxBsjIvehbv_KxBXRKQD9wgyl53c6b0RtgrQRk8';

    private endpoint: string = 'https://api-delifood.herokuapp.com/api'
    // private endpoint: string = 'http://localhost:3000/api';//'http://56a3e988.ngrok.io/api';

    private defaultHeaders: HttpHeaders = new HttpHeaders({
        'Authorization': 'Bearer ' + this.guestToken,
        'Content-Type': 'application/json'
    });

    defaultOptions: object = { headers: this.defaultHeaders };

    userEndpoint: string = this.endpoint + '/users';

    categoryEndpoint: string = this.endpoint + '/categories';

    productEndpoint: string = this.endpoint + '/products';

    orderEndpoint: string = this.endpoint + '/orders';

    authEndpoint: string = this.endpoint + '/auth/admin';

    testEndpoint: string = 'http://localhost:3000/test';
    
}