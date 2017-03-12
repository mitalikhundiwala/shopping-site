import * as _ from 'underscore';
import { BehaviorSubject } from 'rxjs/Rx';
import { OrderItem } from './order-item';
import { Product } from './product';

export class Order {
    readonly orderItems: BehaviorSubject<OrderItem[]> = new BehaviorSubject([]);
    private _totalPrice: number = 0;

    constructor(props: { orderItems: OrderItem[] }) {
        this.orderItems.next(props.orderItems);
        this.orderItems.subscribe((orderItems: OrderItem[]) => {
            this._totalPrice = _.reduce(orderItems, (memo: number, currentOrderItem: OrderItem) => {
                return memo + (currentOrderItem.product.price * currentOrderItem.quantity);
            }, 0);
        });
    }

    get totalPrice(): number {
        return this._totalPrice;
    }

    private _findOrderItemForProduct(product: Product): OrderItem {
        let matchedOrderItem: OrderItem = _.find(this.orderItems.getValue(), (currentOrderItem: OrderItem) => {
            return currentOrderItem.product.id === product.id;
        });

        return matchedOrderItem;
    }

    hasProductInOrder(product: Product): boolean {
        return this._findOrderItemForProduct(product) ? true : false;
    }

    addProductToOrder(product: Product, quantity: number): OrderItem {
        let orderItemModified: OrderItem = null;

        let matchedOrderItem: OrderItem = this._findOrderItemForProduct(product);

        let orderItems: OrderItem[] = this.orderItems.getValue();
        if (matchedOrderItem) {
            matchedOrderItem.quantity = matchedOrderItem.quantity + quantity;
            orderItemModified = matchedOrderItem;
        } else {
            let orderItem: OrderItem = new OrderItem({
                product: product,
                quantity: quantity
            });
            orderItems.push(orderItem);
            orderItemModified = orderItem;
        }
        this.orderItems.next(orderItems);

        return orderItemModified;
    }

    removeProductFromOrder(product: Product): OrderItem {
        let orderItems: OrderItem[] = this.orderItems.getValue();
        let matchedOrderItem: OrderItem = this._findOrderItemForProduct(product);
        let index = _.findIndex(this.orderItems.getValue(), (currentOrderItem: OrderItem) => {
            return currentOrderItem.product.id === matchedOrderItem.product.id;
        });
        let deletedOrderItem: OrderItem = null;
        if (index > -1) {
            deletedOrderItem = this.orderItems.getValue().splice(index, 1)[0];
        }
        this.orderItems.next(orderItems);
        return deletedOrderItem;
    }

    updateProductQuantityFromOrder(product: Product, quantity: number): OrderItem {
        let orderItems: OrderItem[] = this.orderItems.getValue();
        let matchedOrderItem: OrderItem = this._findOrderItemForProduct(product);
        if (matchedOrderItem) {
            matchedOrderItem.quantity = quantity;
        }
        this.orderItems.next(orderItems);
        return matchedOrderItem;
    }

}
