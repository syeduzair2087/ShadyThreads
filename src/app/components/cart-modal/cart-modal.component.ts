import { Component, OnInit, OnDestroy } from '@angular/core'
import { CartServices } from '../../services/cart-services'
import { FirebaseListObservable } from 'angularfire2'
// import { Subscription } from 'rxjs/subscription'

@Component({
    selector: 'cart-modal',
    templateUrl: 'cart-modal.template.html'
})

export class CartModalComponent {
    response: FirebaseListObservable<Array<any>>;
    cartSubscription: any;

    constructor(private cartServices: CartServices) { }

    ngOnInit() {
        this.cartSubscription = this.cartServices.getCartFromFirebase().subscribe(cart => {
            this.response = cart;
            console.log('response updated!');
        });
    }

    ngOnDestroy() {
        this.cartSubscription.unsubscribe();
    }

    btnClickRemoveItem(item_id: string) {
        this.cartServices.deleteFromCart(item_id);
    }

    btnClickRemoveAll() {
        this.cartServices.deleteAllFromCart();
    }

    btnClickCheckout() {
        this.cartServices.checkoutCart();
        // this.response = this.cartServices.getCartFromFirebase();
    }
}