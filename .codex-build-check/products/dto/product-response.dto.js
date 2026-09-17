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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductListResponseDto = exports.ProductResponseDto = exports.ProductManufacturerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const category_response_dto_1 = require("../../categories/dto/category-response.dto");
class ProductManufacturerDto {
    id;
    name;
}
exports.ProductManufacturerDto = ProductManufacturerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], ProductManufacturerDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProductManufacturerDto.prototype, "name", void 0);
class ProductResponseDto {
    id;
    code;
    name;
    description;
    price;
    currency;
    imagePath;
    imageUrl;
    manufacturerId;
    manufacturer;
    categories;
    createdAt;
    updatedAt;
}
exports.ProductResponseDto = ProductResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], ProductResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'HL-OC-001' }),
    __metadata("design:type", String)
], ProductResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true }),
    __metadata("design:type", Object)
], ProductResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true }),
    __metadata("design:type", Object)
], ProductResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        nullable: true,
        example: '49140',
        description: 'Giá trả dạng chuỗi decimal để giữ chính xác; null là chưa có giá.',
    }),
    __metadata("design:type", Object)
], ProductResponseDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'VND' }),
    __metadata("design:type", String)
], ProductResponseDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true }),
    __metadata("design:type", Object)
], ProductResponseDto.prototype, "imagePath", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        format: 'uri',
        nullable: true,
        readOnly: true,
        example: 'https://tvthanh.name.vn/public/templates/uploads/1744694197.jpg',
        description: 'URL ảnh đầy đủ từ imagePath; null khi chưa có ảnh.',
    }),
    __metadata("design:type", Object)
], ProductResponseDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, format: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], ProductResponseDto.prototype, "manufacturerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ProductManufacturerDto, nullable: true }),
    __metadata("design:type", Object)
], ProductResponseDto.prototype, "manufacturer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [category_response_dto_1.CategoryResponseDto] }),
    __metadata("design:type", Array)
], ProductResponseDto.prototype, "categories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, format: 'date-time' }),
    __metadata("design:type", Date)
], ProductResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, format: 'date-time' }),
    __metadata("design:type", Date)
], ProductResponseDto.prototype, "updatedAt", void 0);
class ProductListResponseDto {
    data;
    total;
    page;
    limit;
    totalPages;
}
exports.ProductListResponseDto = ProductListResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ProductResponseDto] }),
    __metadata("design:type", Array)
], ProductListResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'integer' }),
    __metadata("design:type", Number)
], ProductListResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'integer' }),
    __metadata("design:type", Number)
], ProductListResponseDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'integer' }),
    __metadata("design:type", Number)
], ProductListResponseDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'integer' }),
    __metadata("design:type", Number)
], ProductListResponseDto.prototype, "totalPages", void 0);
//# sourceMappingURL=product-response.dto.js.map