import { Component, OnInit } from '@angular/core'
import { ProductServices } from '../../../services/product-services';



@Component({
    selector: 'featured-products',
    templateUrl: 'album.template.html'
})

export class ProductsAlbumComponent{ 
    Response: any;

    constructor(private productServices: ProductServices){}

    ngOnInit()
    {
        this.Response = this.productServices.getProducts();
    }
}