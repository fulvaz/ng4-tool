import {
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

/**
 * Index Component
 * 顶层组件
 */
@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,    /* 样式无封装 */
    styleUrls: [
        './index.component.css'
    ],
    templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {
    constructor() {}

    public ngOnInit() {
        console.log('初始化Index组件');
    }

}