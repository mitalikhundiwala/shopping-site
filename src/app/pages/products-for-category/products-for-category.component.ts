import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Product } from '../../models/product';
import { Category } from '../../models/category';


@Component({
  selector: 'app-products-for-category',
  templateUrl: './products-for-category.component.html',
  styleUrls: ['./products-for-category.component.scss']
})
export class ProductsForCategoryComponent implements OnInit {

  products: Product[] = [];
  category: Category;
  constructor(
    public _route: ActivatedRoute,
    private _router: Router,
    private _productService: ProductService,
    private _categoryService: CategoryService,
  ) {
    this._route.params.subscribe((routeParams: any) => {
      let categoryId: number = parseInt(routeParams.categoryId, 10);
      this._productService.getProdcutsByCategoryId(categoryId)
        .subscribe((prodcuts) => {
          this.products = prodcuts;
        });
      this._categoryService.categories.subscribe((categories: Category[]) => {
        this.category = this._categoryService.getCategory(categoryId);
      });
    });

  }

  ngOnInit() {
  }

}
