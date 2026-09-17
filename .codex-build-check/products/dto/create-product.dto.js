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
exports.CreateProductDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const trim_text_transformer_1 = require("../../common/transformers/trim-text.transformer");
class CreateProductDto {
    code;
    name;
    description;
    price;
    imagePath;
    manufacturerId;
    categoryIds;
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'HL-OC-001', minLength: 1, maxLength: 100 }),
    (0, class_transformer_1.Transform)(trim_text_transformer_1.trimText),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], CreateProductDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        nullable: true,
        example: 'Ốc vít',
        maxLength: 255,
    }),
    (0, class_transformer_1.Transform)(trim_text_transformer_1.nullableTrimmedText),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", Object)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, nullable: true, maxLength: 10000 }),
    (0, class_transformer_1.Transform)(trim_text_transformer_1.nullableTrimmedText),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(10000),
    __metadata("design:type", Object)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Number,
        nullable: true,
        example: 49140,
        minimum: 0,
        maximum: 999999999999.99,
        description: 'Giá VNĐ, tối đa 2 chữ số thập phân. 0 hoặc null nghĩa là chưa có giá.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(999999999999.99),
    __metadata("design:type", Object)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        nullable: true,
        example: '1744694197.jpg',
        maxLength: 2048,
        description: 'Tên/path ảnh hoặc URL ảnh đã có; endpoint này không upload file.',
    }),
    (0, class_transformer_1.Transform)(trim_text_transformer_1.nullableTrimmedText),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(2048),
    __metadata("design:type", Object)
], CreateProductDto.prototype, "imagePath", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, format: 'uuid', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", Object)
], CreateProductDto.prototype, "manufacturerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: 'array',
        items: { type: 'string', format: 'uuid' },
        maxItems: 100,
        uniqueItems: true,
        description: 'Các UUID danh mục. Khi PATCH, bỏ qua trường để giữ nguyên; [] để bỏ mọi danh mục; mảng mới thay thế toàn bộ danh sách.',
    }),
    (0, class_validator_1.ValidateIf)((_object, value) => value !== undefined),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMaxSize)(100),
    (0, class_validator_1.ArrayUnique)(),
    (0, class_validator_1.IsUUID)(undefined, { each: true }),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "categoryIds", void 0);
//# sourceMappingURL=create-product.dto.js.map