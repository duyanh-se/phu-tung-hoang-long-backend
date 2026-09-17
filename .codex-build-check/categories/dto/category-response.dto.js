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
exports.CategoryListResponseDto = exports.CategoryResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CategoryResponseDto {
    id;
    name;
    description;
    createdAt;
    updatedAt;
}
exports.CategoryResponseDto = CategoryResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], CategoryResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Phụ tùng động cơ' }),
    __metadata("design:type", String)
], CategoryResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true }),
    __metadata("design:type", Object)
], CategoryResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, format: 'date-time' }),
    __metadata("design:type", Date)
], CategoryResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, format: 'date-time' }),
    __metadata("design:type", Date)
], CategoryResponseDto.prototype, "updatedAt", void 0);
class CategoryListResponseDto {
    data;
    total;
    page;
    limit;
    totalPages;
}
exports.CategoryListResponseDto = CategoryListResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CategoryResponseDto] }),
    __metadata("design:type", Array)
], CategoryListResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'integer' }),
    __metadata("design:type", Number)
], CategoryListResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'integer' }),
    __metadata("design:type", Number)
], CategoryListResponseDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'integer' }),
    __metadata("design:type", Number)
], CategoryListResponseDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'integer' }),
    __metadata("design:type", Number)
], CategoryListResponseDto.prototype, "totalPages", void 0);
//# sourceMappingURL=category-response.dto.js.map