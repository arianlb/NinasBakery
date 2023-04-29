"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    price: { type: Number, default: 0 },
    offer: { type: Boolean, default: false },
    picture: { type: String }
});
/*productSchema.methods.toJSON = function () {
    const { __v, ...product } = this.toObject();
    return product;
}*/
exports.default = (0, mongoose_1.model)('Product', productSchema);
//# sourceMappingURL=product.js.map