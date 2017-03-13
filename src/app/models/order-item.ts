import { Product } from './product';
export class OrderItem {
    readonly product: Product = null;
    quantity: number = 0;

    constructor(props: {product: Product, quantity: number }) {
        this.product = props.product;
        this.quantity = props.quantity;
    }

    get price(): number {
        return this.product.price * this.quantity;
    }
}
