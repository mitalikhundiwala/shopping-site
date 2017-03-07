import { Category } from './models/category';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  notificationOptions: any = [];
  categories: Category[] = [];

  constructor(
    private _categoryService: CategoryService,
  ) {
    this._categoryService.getCategories()
      .subscribe((categories) => {
        this.categories = categories;
        debugger;
      });
  }
}
