import {
    StoreModule
} from '@ngrx/store';
import {
    EffectsModule
} from '@ngrx/effects';
import {
    StoreDevtoolsModule
} from '@ngrx/store-devtools';
import {
    ListBooksEffect,
    ListBooksReducer,
    ListBooksService,
    BOOKS_START,
    BOOKS_SUCCESS,
    BOOKS_ERROR
} from './pages/list/books/ngrx';

export const APP_NGRX_PROVIDERS = [
    ListBooksService
];

export const APP_NGRX_IMPORT = [
    StoreModule.forRoot({
        ListBooksReducer
    }),
    StoreDevtoolsModule.instrument({ maxAge: 50 }),
    EffectsModule.forRoot([ListBooksEffect]),
];