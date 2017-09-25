import {
    Action
} from '@ngrx/store';

import {
    BooksSuccessModel
} from '../models';
export const BOOKS_SUCCESS = '[Books] Success';

export class ListSuccessAction implements Action {
    public readonly type = BOOKS_SUCCESS;
    constructor(public payload: BooksSuccessModel) {
        /*  */
    }
}
