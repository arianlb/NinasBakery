import Category from '../models/category';

export const deleteProductFromCategory = async (categoryName: string, productId: any) => {
    const category = await Category.findOne({ name: categoryName });
    if (category) {
        for (let i = 0; i < category.products.length!; i++) {
            if (category.products[i].equals(productId)) {
                category.products.splice(i, 1);
                break;
            }
        }
        category.save();
    }
}