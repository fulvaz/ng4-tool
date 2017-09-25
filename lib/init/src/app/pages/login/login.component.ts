import {
    Component,
    OnInit,
    OnDestroy,
    HostBinding
} from '@angular/core';

/* 动画 */
import {
    fadeInAnimation
} from '../../common/animations';

@Component({
    selector: 'login',
    styleUrls: ['./login.component.css'],
    templateUrl: './login.component.html',
    animations: [fadeInAnimation]
})
export class LoginComponent implements OnInit, OnDestroy {
    @HostBinding('@fadeInAnimation') get fadeInAnimation() {
        return true;
    }
    constructor() {}
    public ngOnInit() {
       console.log('初始化登录页面完成');
    }
    public ngOnDestroy(){
        console.log('销毁登录页面完成');
    }
}
