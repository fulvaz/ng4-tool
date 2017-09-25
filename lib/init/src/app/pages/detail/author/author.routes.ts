import {
    AuthorComponent
 } from './author.component';
 export const routes = [{
     path: ':id',
     component: AuthorComponent,
     pathMatch: 'full'
 }];
 