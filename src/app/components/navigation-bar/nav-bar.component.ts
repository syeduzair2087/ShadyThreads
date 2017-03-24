import { Component, OnInit } from '@angular/core';
import { LoginServices } from '../../services/login-services';

@Component({
    selector: 'nav-bar',
    templateUrl: 'nav-bar.template.html',
})
export class NavigationBarComponent {
    searchVisible: boolean = false;

    constructor(private loginServices: LoginServices) { }

    ngOnInit() { }

    formToggle() {
        setTimeout(() => {
            this.searchVisible = !this.searchVisible;
        }, 50);
    }


}