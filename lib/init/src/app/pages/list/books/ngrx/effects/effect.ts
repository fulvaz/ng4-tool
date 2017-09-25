import {
    Injectable
} from '@angular/core';
import {
    Effect,
    Actions,
    toPayload
} from '@ngrx/effects';
import {
    Action
} from '@ngrx/store';
import {
    Observable
} from 'rxjs/Observable';

import {
    ListBooksService
} from './../services';
import {
    BOOKS_ERROR,
    BOOKS_SUCCESS
} from '../actions';
import * as Model from '../actions';

@Injectable()
export class ListBooksEffect {
    @Effect()
    public Books$: Observable < Action > = this.actions$
        .ofType(Model.BOOKS_START)
        .map(toPayload)
        .switchMap((config) => {
            return this.listBooksService.getListBooks(config.time, config.id, config.name)
                .map((data: any) => {
                    if (data.code === 200) {
                        return {
                            type: BOOKS_SUCCESS,
                            payload: data
                        };
                    }
                    return {
                        type: BOOKS_ERROR,
                        payload: data
                    };
                });
        });
    constructor(private actions$: Actions, private listBooksService: ListBooksService) {}
}