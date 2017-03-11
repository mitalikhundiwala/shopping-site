import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import { CategoryAdapter } from './adapters/category-adapter';
import { BehaviorSubject } from 'rxjs/Rx';
import * as _ from 'underscore';
import { Category } from '../models/category';

@Injectable()
export class CategoryService {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _categories: BehaviorSubject<Array<Category>> = new BehaviorSubject(([]));
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

    getCategory(id: number): Category {
        let categories = this._categories.getValue();
        let category: Category = _.find(categories, (currentCategory) => {
            return currentCategory.id === id;
        });
        return category;
    }
}
