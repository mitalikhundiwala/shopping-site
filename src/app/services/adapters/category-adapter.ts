import { Category } from '../../models/category';

export class CategoryAdapter {
    static parseResponse(data: any): Category {

        let category: Category = null;
        let subCategories: Category[] = [];
        if (data) {
            if (data.subCategories) {
                for (let subCategory of data.subCategories) {
                    subCategories.push(CategoryAdapter.parseResponse(subCategory));
                }
            }
            category = new Category({
                id: data.id,
                name: data.name,
                subCategories: subCategories
            });
        }
        return category;
    }
}
