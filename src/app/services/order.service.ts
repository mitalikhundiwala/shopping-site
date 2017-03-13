import * as _ from 'underscore';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import { BehaviorSubject } from 'rxjs/Rx';
import * as lscache from 'lscache';
import { OrderItem } from '../models/order-item';
import { Order } from '../models/order';
import { Product } from '../models/product';
import { Category } from '../models/category';

@Injectable()
export class OrderService {
    private _headers: Headers = new Headers();
    private _order: BehaviorSubject<Order> = new BehaviorSubject(null);
    public get order(): BehaviorSubject<Order> {
        return this._order;
    }

    _parseOrderItem(orderItemData: {
        product: {
            id: number,
            name: string,
            price: number,
            isDiscounted: boolean,
            priceBeforeDiscount: number,
            image: string,
            description: string,
            company: string,
            categoryId: number,
            category: Category
        }, quantity: number
    }): OrderItem {
        return new OrderItem({
            product: new Product(orderItemData.product),
            quantity: orderItemData.quantity
        });
    }

    _saveOrder() {
        let order: Order = this._order.getValue();
        let orderItems: OrderItem[] = order.orderItems.getValue();
        let orderData: any = _.extend({
            orderItems: _.map(orderItems, (currentOrderItem: OrderItem) => {
                return {
                    product: {
                        id: currentOrderItem.product.id,
                        name: currentOrderItem.product.name,
                        price: currentOrderItem.product.price,
                        isDiscounted: currentOrderItem.product.isDiscounted,
                        priceBeforeDiscount: currentOrderItem.product.priceBeforeDiscount,
                        image: currentOrderItem.product.image,
                        description: currentOrderItem.product.description,
                        company: currentOrderItem.product.company,
                        categoryId: currentOrderItem.product.categoryId,
                        category: null
                    },
                    quantity: currentOrderItem.quantity
                };
            })
        });

        lscache.set('order', JSON.stringify(orderData));
    }

    constructor(
        private _http: Http
    ) {
        this._headers.append('Content-Type', 'application/json');
        let orderData: any = lscache.get('order') ? JSON.parse(lscache.get('order')) : null;
        let order: Order = null;
        if (orderData) {
            order = new Order({
                orderItems: _.map(orderData.orderItems, this._parseOrderItem)
            });
        } else {
            order = new Order({
                orderItems: []
            });
        }
        this._order.next(order);
    }

    addProductToOrder(product: Product, quantity: number): OrderItem {
        let order: Order = this._order.getValue();
        let modifiedOrderItem: OrderItem = order.addProductToOrder(product, quantity);
        this._saveOrder();
        return modifiedOrderItem;
    }

    removeProductFromOrder(product: Product): OrderItem {
        let order: Order = this._order.getValue();
        let modifiedOrderItem: OrderItem = order.removeProductFromOrder(product);
        this._saveOrder();
        return modifiedOrderItem;
    }

    updateProductQuantityFromOrder(product: Product, quantity: number): OrderItem {
        let order: Order = this._order.getValue();
        let modifiedOrderItem: OrderItem = order.updateProductQuantityFromOrder(product, quantity);
        this._saveOrder();
        return modifiedOrderItem;
    }


}
