import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
    selector: 'products-panel',
    templateUrl: 'products-panel.template.html'
})

export class ProductsPanelComponent {

    @Input() products_list: any;
    @Input() category_id: any;

    @Output() getColorEventEmitter = new EventEmitter();

    constructor() { }

    cardClickProduct(product_id: number){
        this.getColorEventEmitter.emit({productId: product_id, categoryId: this.category_id});
    }

}