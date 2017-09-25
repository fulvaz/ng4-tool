import 'rxjs/add/operator/map';
import {
    Injectable
} from '@angular/core';
import {
    Observable
} from 'rxjs/RX';

import {
    TemplateModel
} from '../models';

@Injectable()
export class TemplateService {
    constructor() {
        /*  */
    }
    public get(config): Observable < any > {
        return Observable.of(config)
            .debounceTime(2000)
            .map((value) => {
                return value;
            });
    };
}