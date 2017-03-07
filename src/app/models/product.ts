import { Category } from './category';
export class Product {
    readonly id: number = 0;
    readonly name: string = '';
    readonly categoryId: number = 0;
    readonly category: Category = null;

    constructor(props: { id: number, name: string, categoryId: number, category: Category }) {
        this.id = props.id;
        this.name = props.name;
        this.categoryId = props.categoryId;
        this.category = props.category;
    }
}
