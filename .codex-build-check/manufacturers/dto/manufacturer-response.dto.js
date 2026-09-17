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
exports.DeleteManufacturerResponseDto = exports.ManufacturerListResponseDto = exports.ManufacturerResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ManufacturerResponseDto {
    id;
    name;
    createdAt;
    updatedAt;
}
exports.ManufacturerResponseDto = ManufacturerResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], ManufacturerResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Honda' }),
    __metadata("design:type", String)
], ManufacturerResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, format: 'date-time' }),
    __metadata("design:type", Date)
], ManufacturerResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, format: 'date-time' }),
    __metadata("design:type", Date)
], ManufacturerResponseDto.prototype, "updatedAt", void 0);
class ManufacturerListResponseDto {
    data;
    total;
    page;
    limit;
    totalPages;
}
exports.ManufacturerListResponseDto = ManufacturerListResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ManufacturerResponseDto] }),
    __metadata("design:type", Array)
], ManufacturerListResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'integer' }),
    __metadata("design:type", Number)
], ManufacturerListResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'integer' }),
    __metadata("design:type", Number)
], ManufacturerListResponseDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'integer' }),
    __metadata("design:type", Number)
], ManufacturerListResponseDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'integer' }),
    __metadata("design:type", Number)
], ManufacturerListResponseDto.prototype, "totalPages", void 0);
class DeleteManufacturerResponseDto {
    message;
}
exports.DeleteManufacturerResponseDto = DeleteManufacturerResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'delete success' }),
    __metadata("design:type", String)
], DeleteManufacturerResponseDto.prototype, "message", void 0);
//# sourceMappingURL=manufacturer-response.dto.js.map