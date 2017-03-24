import { Component, Input } from '@angular/core'
import { AccountServices } from '../../../services/account-services';
import { SharedServices } from '../../../services/shared-services';

@Component({
    selector: 'delete-account-modal',
    templateUrl: 'delete-account.template.html'
})

export class DeleteAccountModalComponent {

    @Input() accountServices: AccountServices;
    // @Input() originalPassword: string;

    // confirmPassword: string;

    constructor(private sharedServices: SharedServices) { }

    btnClickRemoveAccount() {
        // if (this.originalPassword == this.confirmPassword) {
            this.accountServices.removeAccount();
        // }

        // else{
        //     this.sharedServices.addToast('Delete Failed', 'Sorry, the password you have entered does not match the original password. Please try again.', 'error');
        // }
    }
}