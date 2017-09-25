import 'rxjs/add/operator/map';
import {
    Injectable
} from '@angular/core';
import {
    Observable
} from 'rxjs/RX';

import * as Model from '../models';

@Injectable()
export class ListBooksService {
    constructor() {
        /*  */
    }
    public getListBooks(time: number, id: number | string, name: string): Observable < any > {
        return Observable.of(time)
            .debounceTime(time)
            .map((value) => {
                if (value === -1) {
                    return {
                        id,
                        name,
                        code: 4102,
                        list: []
                    };
                }
                return {
                    id,
                    name,
                    code: 200,
                    list: [{
                        id: 1,
                        name: '书列表1'
                    }, {
                        id: 2,
                        name: '书列表2'
                    }, {
                        id: 3,
                        name: '书列表3'
                    }]
                };
            });
    }
}