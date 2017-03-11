import * as _string from 'underscore.string';
import { Category } from './category';

export class Product {
    readonly id: number = 0;
    readonly name: string = '';
    readonly price: number = 0;
    readonly isDiscounted: boolean = false;
    readonly priceBeforeDiscount: number = 0;
    readonly image: string = '';
    readonly description: string = '';
    readonly company: string = '';
    readonly categoryId: number = 0;
    readonly category: Category = null;

    get shortDescroption(): string {
        return _string.truncate(this.description, 50);
    }

    constructor(props: {
        id: number,
        name: string,
        price: number,
        isDiscounted: boolean,
        priceBeforeDiscount: number,
        image: string,
        description: string,
        company: string,
        categoryId: number,
        category: Category
    }) {
        this.id = props.id;
        this.name = props.name;
        this.price = props.price;
        this.isDiscounted = props.isDiscounted;
        this.priceBeforeDiscount = props.priceBeforeDiscount;
        this.image = props.image;
        this.description = props.description;
        this.company = props.company;
        this.categoryId = props.categoryId;
        this.category = props.category;
    }
}
