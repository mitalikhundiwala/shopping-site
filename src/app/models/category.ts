export class Category {
    readonly id: number = 0;
    readonly name: string = '';
    readonly subCategories: Category[] = [];

    constructor(props: { id: number, name: string, subCategories: Category[] }) {
        this.id = props.id;
        this.name = props.name;
        this.subCategories = props.subCategories;
    }
}
