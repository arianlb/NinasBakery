import Category from '../models/category';

export const categoryExistsById = async (id: string) => { 
    const category = await Category.findById(id);
    if (!category) {
        throw new Error(`La categoria con el id ${id} no existe en la BD`);
    }
}