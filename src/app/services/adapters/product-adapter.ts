import { Product } from '../../models/product';

export class ProductAdapter {
    static parseResponse(data: any): Product {

        let product: Product = null;
        if (data) {
            product = new Product({
                id: data.id,
                name: data.name,
                price : data.price,
                isDiscounted : data.isDiscounted,
                priceBeforeDiscount : data.priceBeforeDiscount,
                image : data.image,
                description : data.description,
                company : data.company,
                categoryId : data.categoryId,
                category : null
            });
        }
        return product;
    }
}
