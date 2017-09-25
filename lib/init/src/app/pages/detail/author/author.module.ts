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
} from './author.routes';
import {
    AuthorComponent
} from './author.component';

@NgModule({
    declarations: [
        /**
         * Components / Directives/ Pipes
         */
        AuthorComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
    ],
})
export class AuthorModule {
    public static routes = routes;
}