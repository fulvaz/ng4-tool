import {
    Component,
    OnInit,
} from '@angular/core';

@Component({
    selector: 'detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

    public ngOnInit() {
        console.log('详情页面初始化完成');
    }

}