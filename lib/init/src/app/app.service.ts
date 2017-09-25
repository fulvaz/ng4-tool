import {
  Injectable
} from '@angular/core';

export interface InternalStateType {
  [key: string]: any;
}
@Injectable()
export class AppService {

  public login(username, password) {
      alert(username+' 登录成功!');
  }
}