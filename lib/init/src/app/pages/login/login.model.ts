export class LoginModel {
    constructor(
        public username: string = '',
        public pwd: string = '',
        public captcha ?: string,
        public success: boolean = true
    ) {}
}
