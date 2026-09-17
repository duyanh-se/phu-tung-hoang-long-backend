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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const api_errors_decorator_1 = require("../common/decorators/api-errors.decorator");
const pagination_query_dto_1 = require("../common/dto/pagination-query.dto");
const enums_1 = require("../generated/prisma/enums");
const update_profile_dto_1 = require("./dto/update-profile.dto");
const update_role_dto_1 = require("./dto/update-role.dto");
const user_response_dto_1 = require("./dto/user-response.dto");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    users;
    constructor(users) {
        this.users = users;
    }
    updateMe(user, dto) {
        return this.users.updateProfile(user.id, dto);
    }
    list(query) {
        return this.users.list(query);
    }
    findOne(id) {
        return this.users.findOne(id);
    }
    updateRole(id, dto, user) {
        return this.users.updateRole(id, dto.role, user.id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Patch)('me'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật hồ sơ cá nhân' }),
    (0, swagger_1.ApiOkResponse)({ type: user_response_dto_1.UserResponseDto }),
    (0, api_errors_decorator_1.ApiErrors)(404),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_profile_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateMe", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: '[ADMIN] Danh sách người dùng có phân trang' }),
    (0, swagger_1.ApiOkResponse)({ type: user_response_dto_1.UserListResponseDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: '[ADMIN] Xem người dùng theo ID' }),
    (0, swagger_1.ApiOkResponse)({ type: user_response_dto_1.UserResponseDto }),
    (0, api_errors_decorator_1.ApiErrors)(404),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/role'),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: '[ADMIN] Đổi vai trò người dùng (không cho đổi vai trò của chính mình)',
    }),
    (0, swagger_1.ApiOkResponse)({ type: user_response_dto_1.UserResponseDto }),
    (0, api_errors_decorator_1.ApiErrors)(404),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_role_dto_1.UpdateRoleDto, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateRole", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users & Authorization'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, api_errors_decorator_1.ApiErrors)(400, 401, 403, 429),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map