"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const api_errors_decorator_1 = require("../common/decorators/api-errors.decorator");
const enums_1 = require("../generated/prisma/enums");
const create_product_dto_1 = require("./dto/create-product.dto");
const delete_product_response_dto_1 = require("./dto/delete-product-response.dto");
const product_query_dto_1 = require("./dto/product-query.dto");
const product_response_dto_1 = require("./dto/product-response.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const products_service_1 = require("./products.service");
let ProductsController = class ProductsController {
    products;
    constructor(products) {
        this.products = products;
    }
    list(query) {
        return this.products.list(query);
    }
    findOne(id) {
        return this.products.findOne(id);
    }
    create(dto) {
        return this.products.create(dto);
    }
    update(id, dto) {
        return this.products.update(id, dto);
    }
    async remove(id) {
        await this.products.remove(id);
        return { message: 'delete success' };
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Danh sách sản phẩm chưa xóa, phân trang và lọc' }),
    (0, swagger_1.ApiOkResponse)({ type: product_response_dto_1.ProductListResponseDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_query_dto_1.ProductQueryDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "list", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Chi tiết sản phẩm chưa xóa' }),
    (0, swagger_1.ApiOkResponse)({ type: product_response_dto_1.ProductResponseDto }),
    (0, api_errors_decorator_1.ApiErrors)(404),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, api_errors_decorator_1.ApiErrors)(401, 403, 409),
    (0, swagger_1.ApiOperation)({ summary: '[ADMIN] Tạo sản phẩm, gán nhiều danh mục' }),
    (0, swagger_1.ApiCreatedResponse)({ type: product_response_dto_1.ProductResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, api_errors_decorator_1.ApiErrors)(401, 403, 404, 409),
    (0, swagger_1.ApiOperation)({
        summary: '[ADMIN] Cập nhật sản phẩm; categoryIds thay thế toàn bộ danh mục khi được gửi',
    }),
    (0, swagger_1.ApiOkResponse)({ type: product_response_dto_1.ProductResponseDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, api_errors_decorator_1.ApiErrors)(401, 403, 404),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ type: delete_product_response_dto_1.DeleteProductResponseDto }),
    (0, swagger_1.ApiOperation)({
        summary: '[ADMIN] Xóa mềm sản phẩm, giữ mã hàng và liên kết danh mục',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "remove", null);
exports.ProductsController = ProductsController = __decorate([
    (0, swagger_1.ApiTags)('Products'),
    (0, api_errors_decorator_1.ApiErrors)(400, 429),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map