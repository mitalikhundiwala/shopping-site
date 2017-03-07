import { Category } from '../models/category';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import { CategoryAdapter } from './adapters/category-adapter';

@Injectable()
export class CategoryService {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();
    constructor(
        private _http: Http
    ) {
        this._headers.append('Content-Type', 'application/json');
    }

    getCategories(): Observable<Category[]> {
        let promise: Promise<Category[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/data/categories.json').map(res => res.json())
                .subscribe((data: any) => {
                    let categories: Category[] = [];
                    if (data) {
                        categories = (<Object[]>data).map((category: any) => {
                            return CategoryAdapter.parseResponse(category);
                        });
                    }
                    resolve(categories);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Category[]>>Observable.fromPromise(promise);
    }
}