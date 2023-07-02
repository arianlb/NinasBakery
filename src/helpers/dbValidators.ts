import Category from '../models/category';
import Product from '../models/product';
import User from '../models/user';

export const categoryExistsByName = async (name: string) => {
    if (name) {
        const category = await Category.findOne({ name });
        if (!category) {
            throw new Error(`La categoria con el nombre ${name} no existe en la BD`);
        }
    }
}

export const categoryHasNotProducts = async (id: string) => { 
    const category = await Category.findById(id).populate('products');
    if (!category) {
        throw new Error(`La categoria con el id ${id} no existe en la BD`);
    }

    if (category.products.length > 0) {
        throw new Error(`La categoria con el id ${id} tiene productos asociados`);
    }
}

export const productExistsById = async (id: string) => { 
    const product = await Product.findById(id);
    if (!product) {
        throw new Error(`El producto con el id ${id} no existe en la BD`);
    }
}

export const usernameExists = async (username: string) => {
    const exists = await User.findOne({ username });
    if (exists) {
        throw new Error(`El nombre de usuario ${username} ya existe en la BD`);
    }
}

export const userExistsById = async (id: string) => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error(`El usuario con el id ${id} no existe en la BD`);
    }
}

export const isRoleValid = async (role: string) => {
    if (role !== 'ROLE_ADMIN' && role !== 'ROLE_USER') {
        throw new Error(`El rol ${role} no esta permitido`);
    }
}