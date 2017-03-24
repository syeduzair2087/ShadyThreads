import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
    selector: 'details-panel',
    templateUrl: 'details-panel.template.html'
})

export class DetailsPanelComponent {

    @Input() category_id: any;
    @Input() product_id: any;
    @Input() category_prefs: any;
    @Input() color_select_visible: boolean = false;
    @Input() color_list: any;

    @Output() addToCartEventEmitter = new EventEmitter();

    constructor() { }

    btnClickAddToCart() {
        this.addToCartEventEmitter.emit({ productId: this.product_id, categoryId: this.category_id });
    }
}