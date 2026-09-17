"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSelect = void 0;
exports.toProductResponse = toProductResponse;
const product_image_1 = require("./product-image");
exports.productSelect = {
    id: true,
    code: true,
    name: true,
    description: true,
    price: true,
    currency: true,
    imagePath: true,
    manufacturerId: true,
    createdAt: true,
    updatedAt: true,
    manufacturer: { select: { id: true, name: true } },
    categories: { orderBy: { categoryId: 'asc' }, select: { category: true } },
};
function toProductResponse(product) {
    return {
        ...product,
        price: product.price?.toString() ?? null,
        imageUrl: (0, product_image_1.productImageUrl)(product.imagePath),
        categories: product.categories.map((link) => link.category),
    };
}
//# sourceMappingURL=product.select.js.map