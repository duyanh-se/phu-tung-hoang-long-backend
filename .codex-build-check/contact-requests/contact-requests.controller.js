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
exports.ContactRequestsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const api_errors_decorator_1 = require("../common/decorators/api-errors.decorator");
const enums_1 = require("../generated/prisma/enums");
const contact_requests_service_1 = require("./contact-requests.service");
const contact_request_query_dto_1 = require("./dto/contact-request-query.dto");
const contact_request_response_dto_1 = require("./dto/contact-request-response.dto");
const create_contact_request_dto_1 = require("./dto/create-contact-request.dto");
const update_contact_request_dto_1 = require("./dto/update-contact-request.dto");
let ContactRequestsController = class ContactRequestsController {
    contacts;
    constructor(contacts) {
        this.contacts = contacts;
    }
    create(dto) {
        return this.contacts.create(dto);
    }
    list(query) {
        return this.contacts.list(query);
    }
    findOne(id) {
        return this.contacts.findOne(id);
    }
    update(id, dto) {
        return this.contacts.update(id, dto);
    }
    async remove(id) {
        await this.contacts.remove(id);
        return { message: 'delete success' };
    }
};
exports.ContactRequestsController = ContactRequestsController;
__decorate([
    (0, common_1.Post)(),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Gửi yêu cầu liên hệ, không cần đăng nhập; trạng thái ban đầu NEW',
    }),
    (0, swagger_1.ApiCreatedResponse)({ type: contact_request_response_dto_1.ContactRequestResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contact_request_dto_1.CreateContactRequestDto]),
    __metadata("design:returntype", void 0)
], ContactRequestsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, api_errors_decorator_1.ApiErrors)(401, 403),
    (0, swagger_1.ApiOperation)({
        summary: '[ADMIN] Danh sách yêu cầu liên hệ, tìm kiếm và lọc trạng thái',
    }),
    (0, swagger_1.ApiOkResponse)({ type: contact_request_response_dto_1.ContactRequestListResponseDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contact_request_query_dto_1.ContactRequestQueryDto]),
    __metadata("design:returntype", void 0)
], ContactRequestsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, api_errors_decorator_1.ApiErrors)(401, 403, 404),
    (0, swagger_1.ApiOperation)({ summary: '[ADMIN] Chi tiết yêu cầu liên hệ' }),
    (0, swagger_1.ApiOkResponse)({ type: contact_request_response_dto_1.ContactRequestResponseDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContactRequestsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, api_errors_decorator_1.ApiErrors)(401, 403, 404),
    (0, swagger_1.ApiOperation)({
        summary: '[ADMIN] Sửa thông tin hoặc trạng thái yêu cầu liên hệ',
    }),
    (0, swagger_1.ApiOkResponse)({ type: contact_request_response_dto_1.ContactRequestResponseDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_contact_request_dto_1.UpdateContactRequestDto]),
    __metadata("design:returntype", void 0)
], ContactRequestsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, api_errors_decorator_1.ApiErrors)(401, 403, 404),
    (0, swagger_1.ApiOperation)({ summary: '[ADMIN] Xóa vĩnh viễn yêu cầu liên hệ' }),
    (0, swagger_1.ApiOkResponse)({ type: contact_request_response_dto_1.DeleteContactRequestResponseDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContactRequestsController.prototype, "remove", null);
exports.ContactRequestsController = ContactRequestsController = __decorate([
    (0, swagger_1.ApiTags)('Contact requests'),
    (0, api_errors_decorator_1.ApiErrors)(400, 429),
    (0, common_1.Controller)('contact-requests'),
    __metadata("design:paramtypes", [contact_requests_service_1.ContactRequestsService])
], ContactRequestsController);
//# sourceMappingURL=contact-requests.controller.js.map