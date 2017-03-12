import { OrderItem } from '../models/order-item';
import * as _ from 'underscore';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import { BehaviorSubject } from 'rxjs/Rx';
import { Order } from '../models/order';
import { Product } from '../models/product';

@Injectable()
export class OrderService {
    private _headers: Headers = new Headers();
    private _order: BehaviorSubject<Order> = new BehaviorSubject(null);
    public get order(): BehaviorSubject<Order> {
        return this._order;
    }

    constructor(
        private _http: Http
    ) {
        this._headers.append('Content-Type', 'application/json');
        this._order.next(new Order({
            orderItems: []
        }));
    }

    addProductToOrder(product: Product, quantity: number): OrderItem {
        let order: Order = this._order.getValue();
        return order.addProductToOrder(product, quantity);
    }

    removeProductFromOrder(product: Product): OrderItem {
        let order: Order = this._order.getValue();
        return order.removeProductFromOrder(product);
    }

    updateProductQuantityFromOrder(product: Product, quantity: number): OrderItem {
        let order: Order = this._order.getValue();
        return order.updateProductQuantityFromOrder(product, quantity);
    }


}
