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
exports.DeleteContactRequestResponseDto = exports.ContactRequestListResponseDto = exports.ContactRequestResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../generated/prisma/enums");
class ContactRequestResponseDto {
    id;
    fullName;
    email;
    phoneNumber;
    reason;
    status;
    createdAt;
    updatedAt;
}
exports.ContactRequestResponseDto = ContactRequestResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], ContactRequestResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Nguyễn Văn An' }),
    __metadata("design:type", String)
], ContactRequestResponseDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'guest@example.com', format: 'email' }),
    __metadata("design:type", String)
], ContactRequestResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '0901234567' }),
    __metadata("design:type", String)
], ContactRequestResponseDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true }),
    __metadata("design:type", Object)
], ContactRequestResponseDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.ContactRequestStatus, enumName: 'ContactRequestStatus' }),
    __metadata("design:type", String)
], ContactRequestResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, format: 'date-time' }),
    __metadata("design:type", Date)
], ContactRequestResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, format: 'date-time' }),
    __metadata("design:type", Date)
], ContactRequestResponseDto.prototype, "updatedAt", void 0);
class ContactRequestListResponseDto {
    data;
    total;
    page;
    limit;
    totalPages;
}
exports.ContactRequestListResponseDto = ContactRequestListResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ContactRequestResponseDto] }),
    __metadata("design:type", Array)
], ContactRequestListResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'integer' }),
    __metadata("design:type", Number)
], ContactRequestListResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'integer' }),
    __metadata("design:type", Number)
], ContactRequestListResponseDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'integer' }),
    __metadata("design:type", Number)
], ContactRequestListResponseDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'integer' }),
    __metadata("design:type", Number)
], ContactRequestListResponseDto.prototype, "totalPages", void 0);
class DeleteContactRequestResponseDto {
    message;
}
exports.DeleteContactRequestResponseDto = DeleteContactRequestResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'delete success' }),
    __metadata("design:type", String)
], DeleteContactRequestResponseDto.prototype, "message", void 0);
//# sourceMappingURL=contact-request-response.dto.js.map