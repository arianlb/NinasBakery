import { Schema, model } from 'mongoose';

interface IProduct {
    name: string;
    description: string;
    category: string;
    price: number;
    inStock: boolean;
    picture: string;
}

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    price: { type: Number, default: 0 },
    inStock: { type: Boolean, default: false },
    picture: { type: String }
});

/*productSchema.methods.toJSON = function () {
    const { __v, ...product } = this.toObject();
    return product;
}*/

export default model<IProduct>('Product', productSchema);