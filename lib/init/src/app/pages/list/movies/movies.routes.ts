import {
    MoviesComponent
 } from './movies.component';
 export const routes = [{
     path: ':id',
     component: MoviesComponent,
     pathMatch: 'full'
 }];
 