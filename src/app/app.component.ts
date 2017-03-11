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

  constructor(
    private _categoryService: CategoryService
  ) {
    this._categoryService.getCategories()
      .subscribe((categories) => {
        this.categories = categories;
      });
    
  }
}
