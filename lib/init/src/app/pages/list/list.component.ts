import {
    Component,
    OnInit,
} from '@angular/core';

@Component({
    selector: 'list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

    public ngOnInit() {
        console.log('列表页面初始化完成');
    }

}
