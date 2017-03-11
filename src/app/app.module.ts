import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { NoContentComponent } from './pages/no-content-component';
import { ProductsComponent } from './pages/products/products.component';

import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { ProductSummaryCardComponent } from './elements/product-summary-card/product-summary-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NoContentComponent,
    ProductsComponent,
    ProductSummaryCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    // SimpleNotificationsModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    CategoryService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
