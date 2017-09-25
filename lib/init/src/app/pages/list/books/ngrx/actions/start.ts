import {
    Action
} from '@ngrx/store';

import {
    BooksStartModel
} from '../models';
export const BOOKS_START = '[Books] Start';

export class ListStartAction implements Action {
    public readonly type = BOOKS_START;
    constructor(public payload: BooksStartModel) {
        /*  */
    }
}
