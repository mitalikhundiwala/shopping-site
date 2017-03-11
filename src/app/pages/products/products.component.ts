import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private _productService: ProductService
  ) {
    this._productService.getFeaturedProducts()
      .subscribe((prodcuts) => {
        this.products = prodcuts;
      });
  }

  ngOnInit() {
  }

}
