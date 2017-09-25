import {
    BooksComponent
 } from './books.component';
 export const routes = [{
     path: ':id',
     component: BooksComponent,
     pathMatch: 'full'
 }];
 