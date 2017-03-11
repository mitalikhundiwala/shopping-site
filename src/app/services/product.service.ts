import * as _ from 'underscore';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import { ProductAdapter } from './adapters/product-adapter';
import { Product } from '../models/product';

@Injectable()
export class ProductService {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();
    constructor(
        private _http: Http
    ) {
        this._headers.append('Content-Type', 'application/json');
    }

    getProdcutsByCategoryId(categoryId: number): Observable<Product[]> {
        let promise: Promise<Product[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/data/products.json').map(res => res.json())
                .subscribe((data: any) => {
                    let products: Product[] = [];
                    if (data) {
                        products = _.chain(data).filter((currentData: any) => {
                            return currentData.categoryId === categoryId;
                        }).map((product: any) => {
                            return ProductAdapter.parseResponse(product);
                        }).value();
                    }
                    resolve(products);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Product[]>>Observable.fromPromise(promise);
    }

    getFeaturedProducts(): Observable<Product[]> {
        let promise: Promise<Product[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/data/products.json').map(res => res.json())
                .subscribe((data: any) => {
                    let products: Product[] = [];
                    if (data) {
                        let featuredData: any[] = [];
                        _.times(4, () => {
                            featuredData.push(data[_.random(0, data.length)]);
                        });
                        products = (<Object[]>featuredData).map((product: any) => {
                            return ProductAdapter.parseResponse(product);
                        });
                    }
                    resolve(products);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Product[]>>Observable.fromPromise(promise);
    }
}
