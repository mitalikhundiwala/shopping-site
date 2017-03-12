import * as _ from 'underscore';
import { Order } from './models/order';
import { OrderItem } from './models/order-item';
import { OrderService } from './services/order.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from './services/category.service';
import { Category } from './models/category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  notificationOptions: any = [];
  categories: Category[] = [];
  orderItems: OrderItem[] = [];
  countOfOrderItems: number = 0;

  constructor(
    private _categoryService: CategoryService,
    private _orderService: OrderService
  ) {
    this._categoryService.getCategories()
      .subscribe((categories) => {
        this.categories = categories;
      });

    this._orderService.order.subscribe((order: Order) => {
      order.orderItems.subscribe((orderItems: OrderItem[]) => {
        this.orderItems = orderItems;
        this.countOfOrderItems = _.reduce(this.orderItems, (count: number, currentOrderItem: OrderItem) => {
          return currentOrderItem.quantity + count;
        }, 0);
      });
    });

  }
}
