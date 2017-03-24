import { Component, Input } from '@angular/core'
import { AccountServices } from '../../../services/account-services';

@Component({
    selector: 'update-password-modal',
    templateUrl: 'update-password.template.html'
})

export class UpdatePasswordModalComponent {
    @Input() accountServices: AccountServices;
    newPassword: string;
    
    constructor() {}

    btnClickUpdatePassword() {
        this.accountServices.updatePassword(this.newPassword);
    }
}