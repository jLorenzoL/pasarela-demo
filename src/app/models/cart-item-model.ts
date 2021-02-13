import { Product } from 'src/app/models/product';
export class CartItemModel {
    productId : number;
    productName : string;
    productPrice : number;
    qty : number;

    constructor(product: Product) {
        this.productId = product.id;
        this.productName = product.name;
        this.productPrice = product.price;
        this.qty = 1;
    }
}
