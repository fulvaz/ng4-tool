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
} from './books.routes';
import {
    BooksComponent
} from './books.component';

/* 页面服务部分 */

@NgModule({
    declarations: [
        /**
         * Components / Directives/ Pipes
         */
        BooksComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ]
})
export class BooksModule {
    public static routes = routes;
}