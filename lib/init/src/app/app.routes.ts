import {
    Routes
} from '@angular/router';
import {
    IndexComponent
} from './pages/index';
import {
    NoContentComponent
} from './pages/no-content';

import {
    DataResolver
} from './app.resolver';

export const ROUTES: Routes = [{
        path: 'list',
        loadChildren: './pages/list#ListModule'
    },
    {
        path: 'detail',
        loadChildren: './pages/detail#DetailModule'
    },
    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full'
    }
];