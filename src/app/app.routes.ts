import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoContentComponent } from './pages/no-content-component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductsForCategoryComponent } from './pages/products-for-category/products-for-category.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: ProductsComponent, pathMatch: 'full' },
    { path: 'category/:categoryId', component: ProductsForCategoryComponent, pathMatch: 'full' },
    { path: '404', component: NoContentComponent },
    { path: '**', redirectTo: '/404' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
