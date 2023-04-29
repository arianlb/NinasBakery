"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    picture: { type: String },
    products: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Product' }]
});
/*categorySchema.methods.toJSON = function () {
    const { __v, ...category } = this.toObject();
    return category;
}*/
exports.default = (0, mongoose_1.model)('Category', categorySchema);
//# sourceMappingURL=category.js.map