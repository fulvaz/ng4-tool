import {
    Component,
    OnInit,
} from '@angular/core';

@Component({
    selector: 'comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

    public ngOnInit() {
        console.log('评论页面初始化完成');
    }

}