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
exports.ProductQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const pagination_query_dto_1 = require("../../common/dto/pagination-query.dto");
const trim_text_transformer_1 = require("../../common/transformers/trim-text.transformer");
class ProductQueryDto extends pagination_query_dto_1.PaginationQueryDto {
    search;
    categoryId;
    manufacturerId;
    sort;
    minPrice;
    maxPrice;
}
exports.ProductQueryDto = ProductQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Tìm theo mã hoặc tên sản phẩm',
        maxLength: 200,
    }),
    (0, class_transformer_1.Transform)(trim_text_transformer_1.trimText),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], ProductQueryDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ format: 'uuid', description: 'Lọc theo một danh mục' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ProductQueryDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ format: 'uuid' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ProductQueryDto.prototype, "manufacturerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: ['newest', 'price_asc', 'price_desc'],
        default: 'newest',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['newest', 'price_asc', 'price_desc']),
    __metadata("design:type", String)
], ProductQueryDto.prototype, "sort", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Number,
        minimum: 0,
        maximum: 999999999999.99,
        description: 'Giá tối thiểu (VNĐ), bao gồm biên',
    }),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' && /^\d+(\.\d{1,2})?$/.test(value)
        ? Number(value)
        : value),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(999999999999.99),
    __metadata("design:type", Number)
], ProductQueryDto.prototype, "minPrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Number,
        minimum: 0,
        maximum: 999999999999.99,
        description: 'Giá tối đa (VNĐ), bao gồm biên',
    }),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' && /^\d+(\.\d{1,2})?$/.test(value)
        ? Number(value)
        : value),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(999999999999.99),
    __metadata("design:type", Number)
], ProductQueryDto.prototype, "maxPrice", void 0);
//# sourceMappingURL=product-query.dto.js.map