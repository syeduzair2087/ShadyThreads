import { Component, OnInit } from '@angular/core'
import { CartServices } from '../../../services/cart-services'
import { ProductServices } from '../../../services/product-services'

@Component({
    selector: 'category-collapse',
    templateUrl: 'category-collapse.template.html'
})

export class CategoryCollapseComponent {
    selectedProduct: number = null;
    colorSelectVisible = false;
    Response: any;
    Products: Array<any> = [];
    Colors: Array<string> = [];
    detailProductId: number;

    constructor(private cartServices: CartServices, private productServices: ProductServices) { }

    ngOnInit() {
        this.Response = this.productServices.getProducts();
        this.Response.forEach(data => {
            data.forEach(element => {
                this.Products.push(element);
            })
        })


    }

    getProductColorsById(productDetails: any) {
        this.selectedProduct = productDetails.productId;
        this.colorSelectVisible = false;
        this.Colors = [];
        this.Colors = this.Products[productDetails.categoryId].category_products[productDetails.productId].product_colors;
        setTimeout(() => {
            this.colorSelectVisible = true;
            this.detailProductId = productDetails.productId;
        }, 50);

    }

    hideColorSelect() {
        this.colorSelectVisible = false;
    }

    addToCart(orderDetails: any) {
        let order: Object;
        let categoryPrefs = [];
        let orderPrefs = [];
        (this.Products[orderDetails.categoryId].category_prefs).forEach(pref => {
            categoryPrefs.push(pref.pref_title);
        })

        orderPrefs.push(
            {
                pref_title: 'Quantity',
                pref_value: (<HTMLInputElement>document.getElementById('txtQuantity_' + orderDetails.categoryId)).value
            }
        );

        orderPrefs.push(
            {
                pref_title: 'Color',
                pref_value: (<HTMLInputElement>document.getElementById('colorSelect_' + orderDetails.categoryId)).value
            }
        );

        categoryPrefs.forEach(pref => {
            orderPrefs.push({
                pref_title: pref,
                pref_value: (<HTMLInputElement>document.getElementById('pref' + pref)).value,
            })
        });

        order = {
            order_title: this.Products[orderDetails.categoryId].category_products[orderDetails.productId].product_name,
            order_prefs: orderPrefs
        };

        this.cartServices.addToCart(order);
    }
}

 
