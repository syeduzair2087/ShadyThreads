import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NavigationBarComponent } from './nav-bar.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SharedServices } from '../../services/shared-services';

@NgModule({
    declarations: [
        NavigationBarComponent,
        SearchBoxComponent,
        LoginFormComponent
    ],

    imports: [
        BrowserModule
    ],

    providers: [
        SharedServices,
    ],
    
    exports: [
        NavigationBarComponent
    ]
})
export class NavigationBarModule {
    constructor() { }
}
