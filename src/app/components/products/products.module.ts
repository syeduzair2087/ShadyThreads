import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'

import { ProductsComponent } from './products.component'
import { ProductHeaderComponent } from './product-header/product-header.component'
import { CategoryCollapseComponent } from './category-collapse/category-collapse.component'
import { ProductsPanelComponent } from './category-collapse/products-panel/products-panel.component'
import { DetailsPanelComponent } from './category-collapse/details-panel/details-panel.component'
import { SharedServices } from '../../services/shared-services'

import { RoutingModule } from '../../app.routes';

@NgModule({
    declarations: [
        ProductsComponent,
        ProductHeaderComponent,
        CategoryCollapseComponent,
        ProductsPanelComponent,
        DetailsPanelComponent
    ],
    imports: [
        BrowserModule,
        RoutingModule
    ],
    providers: [
        SharedServices
    ],
    exports: [
        ProductsComponent
    ]
})
export class ProductsModule {
    constructor() { }
}
