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
} from './list.routes';
import {
    ListComponent
} from './list.component';

@NgModule({
    declarations: [
        /**
         * Components / Directives/ Pipes
         */
        ListComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
    ],
})
export class ListModule {
    public static routes = routes;
}