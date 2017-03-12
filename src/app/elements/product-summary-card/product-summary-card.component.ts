import { OrderService } from '../../services/order.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-summary-card',
  templateUrl: './product-summary-card.component.html',
  styleUrls: ['./product-summary-card.component.scss']
})
export class ProductSummaryCardComponent implements OnInit {

  public isProductInCart: boolean = false;

  private _product: Product;
  @Input() set product(value: Product) {
    if (value) {
      this._product = value;
      this.isProductInCart = this._orderService.order.getValue().hasProductInOrder(value);
    }
  }

  get product(): Product {
    return this._product;
  }
  constructor(private _orderService: OrderService) { }

  ngOnInit() {
  }

  addProductToCart() {
    if (this._product) {
      this._orderService.addProductToOrder(this._product, 1);
      this.isProductInCart = this._orderService.order.getValue().hasProductInOrder(this._product);
    }
  }

}
