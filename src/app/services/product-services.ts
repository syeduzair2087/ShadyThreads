import { Injectable } from '@angular/core'
import { FirebaseListObservable, AngularFire } from 'angularfire2'

@Injectable()
export class ProductServices {
    constructor(private angularFire: AngularFire) { }

    getProducts() {
        return this.angularFire.database.list('/products');
    }
}