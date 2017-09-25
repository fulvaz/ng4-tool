import {
    Action
} from '@ngrx/store';

import {
    BooksErrorModel
} from '../models';
export const BOOKS_ERROR = '[Books] Error';

export class ListErrorAction implements Action {
    public readonly type = BOOKS_ERROR;
    constructor(public payload: BooksErrorModel) {
        /*  */
    }
}
