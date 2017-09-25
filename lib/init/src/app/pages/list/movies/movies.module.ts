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
} from './movies.routes';
import {
    MoviesComponent
} from './movies.component';

@NgModule({
    declarations: [
        /**
         * Components / Directives/ Pipes
         */
        MoviesComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
    ],
})
export class MoviesModule {
    public static routes = routes;
}