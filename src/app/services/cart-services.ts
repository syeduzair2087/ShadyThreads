import { Injectable, Inject } from '@angular/core'
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseRef } from 'angularfire2'
import { SharedServices } from './shared-services'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class CartServices {

    constructor(private angularFire: AngularFire, private sharedServices: SharedServices, @Inject(FirebaseRef) fbref: any) {
        fbref.database().ref('/cart/').on('child_added', cart => {
            if (cart.key == localStorage.getItem('currentUser')) {
                this.rebindCart(cart.key);
            }
        });

        this.rebindCart(localStorage.getItem('currentUser'));
    }

    private _cartSource = new BehaviorSubject<FirebaseListObservable<any[]>>(null);
    private _cart$ = this._cartSource.asObservable();

    rebindCart(userKey: string) {
        this._cartSource.next(this.angularFire.database.list('/cart/' + userKey));
    }

    addToCart(order: Object) {
        this.angularFire.database.list('/cart/' + localStorage.getItem('currentUser')).push(order).then(
            (success) => {
                this.sharedServices.addToast('Item Added To Cart', 'The selected item has been successfully added to your cart.', 'success');
                console.log('item added!')
            }
        ).catch(
            ((err) => {
                console.log('cart-service-error: ' + err);
                this.sharedServices.addToast('Item Not Added', 'The selected item could not be added due to an error.', 'error')
            })
            );
    }

    getCartFromFirebase() {
        return this._cart$;
    }

    deleteFromCart(itemIndex: string) {
        this.angularFire.database.list('/cart/' + localStorage.getItem('currentUser') + '/' + itemIndex).remove().then(
            (success) => {
                this.sharedServices.addToast('Item Deleted', 'The selected item has been successfully deleted from your cart.', 'success');
            }
        ).catch(
            ((err) => {
                console.log('cart-service-error: ' + err);
                this.sharedServices.addToast('Item Not Deleted', 'The selected item could not be deleted due to an error.', 'error')
            })
            )
    }

    deleteAllFromCart() {
        this.angularFire.database.list('/cart/' + localStorage.getItem('currentUser')).remove().then(
            (success) => {
                this.sharedServices.addToast('Cart Emptied', 'All the items have been removed from your cart.', 'success');
            }
        ).catch(
            ((err) => {
                console.log('cart-service-error: ' + err);
                this.sharedServices.addToast('Cart Not Emptied', 'The items could not be removed from the cart due to an error.', 'error');
            })
            )
    }

    checkoutCart() {
        let orderProduct = [];
        this.angularFire.database.list('/cart/' + localStorage.getItem('currentUser')).forEach(ss => {


            ss.forEach(s => {
                orderProduct.push({
                    order_prefs: s.order_prefs,
                    order_title: s.order_title
                })
            })


        })

        setTimeout(() => {
            this.angularFire.database.list('/orders').push({
                order_user: localStorage.getItem('currentUser'),
                order_items: orderProduct
            }).then((success) => {
                this.sharedServices.addToast('Order Placed Successfully', 'Your order has been placed successfully. Thank you for shopping', 'success');
                this.deleteAllFromCart();
            })
        }, 250);
    }



}