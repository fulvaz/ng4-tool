import {
    CommonModule
} from '@angular/common';
import {
    FormsModule
} from '@angular/forms';
import {
    NgModule
} from '@angular/core';
import {
    RouterModule
} from '@angular/router';

import {
    routes
} from './comment.routes';
import {
    CommentComponent
} from './comment.component';

@NgModule({
    declarations: [
        /**
         * Components / Directives/ Pipes
         */
        CommentComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
    ],
})
export class CommentModule {
    public static routes = routes;
}