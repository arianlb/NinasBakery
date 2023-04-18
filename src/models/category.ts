import { Schema, model, Types } from 'mongoose';

interface ICategory {
    name: string;
    picture: string;
    products: Types.ObjectId[];
}

const categorySchema = new Schema<ICategory>({
    name: { type: String, required: true },
    picture: { type: String },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

/*categorySchema.methods.toJSON = function () {
    const { __v, ...category } = this.toObject();
    return category;
}*/

export default model<ICategory>('Category', categorySchema);