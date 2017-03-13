import { Product } from '../../models/product';
import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';
import { OrderService } from '../../services/order.service';
import { OrderItem } from '../../models/order-item';
import { Order } from '../../models/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  order: Order = null;
  orderItems: OrderItem[] = [];
  countOfOrderItems: number = 0;

  constructor(
    private _orderService: OrderService
  ) {
    this._orderService.order.subscribe((order: Order) => {
      this.order = order;
      order.orderItems.subscribe((orderItems: OrderItem[]) => {
        this.orderItems = orderItems;
        this.countOfOrderItems = _.reduce(this.orderItems, (count: number, currentOrderItem: OrderItem) => {
          return currentOrderItem.quantity + count;
        }, 0);
      });
    });
  }

  ngOnInit() {
  }

  removeOrderItem(product: Product) {
    this._orderService.removeProductFromOrder(product);
  }

  updateProductQuantityFromOrder(event, product: Product) {
    let quantity = parseInt(event.target.value, 10);
    this._orderService.updateProductQuantityFromOrder(product, quantity);
  }

}
