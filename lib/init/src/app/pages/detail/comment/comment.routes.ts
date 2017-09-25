import {
    CommentComponent
 } from './comment.component';
 export const routes = [{
     path: ':id',
     component: CommentComponent,
     pathMatch: 'full'
 }];
 