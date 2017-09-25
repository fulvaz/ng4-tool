import {
    Component,
    OnInit,
} from '@angular/core';

@Component({
    selector: 'movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

    public ngOnInit() {
        console.log('作者页面初始化完成');
    }

}
