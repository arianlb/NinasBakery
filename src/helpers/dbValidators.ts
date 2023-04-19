import Category from '../models/category';
import Product from '../models/product';

export const categoryExistsById = async (id: string) => { 
    const category = await Category.findById(id);
    if (!category) {
        throw new Error(`La categoria con el id ${id} no existe en la BD`);
    }
}

export const productExistsById = async (id: string) => { 
    const product = await Product.findById(id);
    if (!product) {
        throw new Error(`El producto con el id ${id} no existe en la BD`);
    }
}