import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-summary-card',
  templateUrl: './product-summary-card.component.html',
  styleUrls: ['./product-summary-card.component.scss']
})
export class ProductSummaryCardComponent implements OnInit {

  private _product: Product;
  constructor() { }

  ngOnInit() {
  }

  @Input() set product(value: Product) {
    if (value) {
      this._product = value;
    }
  }

  get product(): Product {
    return this._product;
  }

}
