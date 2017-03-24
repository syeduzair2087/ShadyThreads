import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { LoginServices } from '../../services/login-services'

@Component({
    selector: 'sign-up-page',
    templateUrl: 'sign-up.template.html'
})

export class SignUpComponent{
    emailValue: string = '';
    passwordValue: string = '';

    constructor(private angularFire: AngularFire, private loginServices: LoginServices){
    }

    createUser()
    {
        let _email = this.emailValue.toLowerCase().trim();
        this.loginServices.registerUser(_email, this.passwordValue);
    }
}