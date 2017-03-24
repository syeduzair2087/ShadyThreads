import { Component, OnInit } from '@angular/core'
import { AngularFire, FirebaseAuthState } from 'angularfire2'
import { LoginServices } from '../../../services/login-services'

@Component({
    selector: 'login-form',
    templateUrl: 'login-form.template.html'
})

export class LoginFormComponent {
    loginEmail: string = '';
    loginPassword: string = '';

    constructor(private angularFire: AngularFire, private loginServices: LoginServices) { }

    btnClickLogin() {
        if (!this.loginServices.getLoginState()) {
            this.loginServices.loginUser(this.loginEmail, this.loginPassword);
        }
    }

    btnClickLogout() {
        if (this.loginServices.getLoginState) {
            this.loginServices.logoutUser();
        }
    }

    ngOnInit() { }
}