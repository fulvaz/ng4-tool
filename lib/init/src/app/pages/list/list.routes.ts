import {
    ListComponent
} from './list.component';

export const routes = [{
    path: '',
    component: ListComponent,
    children: [{
            path: ''
        }, {
            path: 'books',
            loadChildren: './books#BooksModule'
        },
        {
            path: 'movies',
            loadChildren: './movies#MoviesModule'
        }
    ]
}];