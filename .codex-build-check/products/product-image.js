"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRODUCT_IMAGE_BASE_URL = void 0;
exports.productImageUrl = productImageUrl;
exports.PRODUCT_IMAGE_BASE_URL = 'https://tvthanh.name.vn/public/templates/uploads/';
function productImageUrl(imagePath) {
    const path = imagePath?.trim();
    if (!path)
        return null;
    if (/^https?:\/\//i.test(path))
        return path;
    return (exports.PRODUCT_IMAGE_BASE_URL +
        path.replace(/^\/+/, '').split('/').map(encodeURIComponent).join('/'));
}
//# sourceMappingURL=product-image.js.map