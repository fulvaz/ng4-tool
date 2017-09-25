import {
    DetailComponent
} from './detail.component';

export const routes = [{
    path: '',
    component: DetailComponent,
    children: [{
            path: ''
        }, {
            path: 'author',
            loadChildren: './author#AuthorModule'
        },
        {
            path: 'comment',
            loadChildren: './comment#CommentModule'
        }
    ]
}];