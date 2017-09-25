import {
    Component,
    OnInit,
} from '@angular/core';

@Component({
    selector: 'author',
    templateUrl: './author.component.html',
    styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

    public ngOnInit() {
        console.log('作者页面初始化完成');
    }

}