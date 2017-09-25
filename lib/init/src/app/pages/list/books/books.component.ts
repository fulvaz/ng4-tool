import {
    Component,
    OnInit,
} from '@angular/core';
import {
    Store
} from '@ngrx/store';
@Component({
    selector: 'books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
    public list: any[] = [];
    public name: string = '书列表';
    constructor(
        public store$: Store < any >
    ) {
        /*  */
    }
    public ngOnInit() {
        console.log('作者页面初始化完成');
        /* 获取用户信息 */
        this.store$.dispatch({
            type: '[Books] Start',
            payload: {
                id: 1,
                time: 2000,
                name: '第一个名字'
            }
        });
        this.store$.map((state) => {
            return state['ListBooksReducer'];
        }).filter((data) => {
            console.log(data.id);
            return data;
        }).distinctUntilChanged((x, y) => {
            console.log(x.id, y.id);
            return false;
        }).subscribe((store) => {
            // console.log('1111');
            console.log(store.name);
        });

        setTimeout(() => {
            this.store$.dispatch({
                type: '[Books] Start',
                payload: {
                    id: 9,
                    time: -1,
                    name: '第二个名字'
                }
            });
        }, 3000);

    }

}