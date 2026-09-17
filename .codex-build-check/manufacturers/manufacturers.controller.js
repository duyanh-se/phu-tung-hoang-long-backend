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
exports.ManufacturersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const api_errors_decorator_1 = require("../common/decorators/api-errors.decorator");
const enums_1 = require("../generated/prisma/enums");
const create_manufacturer_dto_1 = require("./dto/create-manufacturer.dto");
const manufacturer_query_dto_1 = require("./dto/manufacturer-query.dto");
const manufacturer_response_dto_1 = require("./dto/manufacturer-response.dto");
const update_manufacturer_dto_1 = require("./dto/update-manufacturer.dto");
const manufacturers_service_1 = require("./manufacturers.service");
let ManufacturersController = class ManufacturersController {
    manufacturers;
    constructor(manufacturers) {
        this.manufacturers = manufacturers;
    }
    list(query) {
        return this.manufacturers.list(query);
    }
    findOne(id) {
        return this.manufacturers.findOne(id);
    }
    create(dto) {
        return this.manufacturers.create(dto);
    }
    update(id, dto) {
        return this.manufacturers.update(id, dto);
    }
    async remove(id) {
        await this.manufacturers.remove(id);
        return { message: 'delete success' };
    }
};
exports.ManufacturersController = ManufacturersController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Danh sách hãng sản xuất, phân trang và tìm theo tên',
    }),
    (0, swagger_1.ApiOkResponse)({ type: manufacturer_response_dto_1.ManufacturerListResponseDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manufacturer_query_dto_1.ManufacturerQueryDto]),
    __metadata("design:returntype", void 0)
], ManufacturersController.prototype, "list", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    (0, api_errors_decorator_1.ApiErrors)(404),
    (0, swagger_1.ApiOperation)({ summary: 'Chi tiết hãng sản xuất' }),
    (0, swagger_1.ApiOkResponse)({ type: manufacturer_response_dto_1.ManufacturerResponseDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ManufacturersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, api_errors_decorator_1.ApiErrors)(401, 403),
    (0, swagger_1.ApiOperation)({ summary: '[ADMIN] Tạo hãng sản xuất' }),
    (0, swagger_1.ApiCreatedResponse)({ type: manufacturer_response_dto_1.ManufacturerResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_manufacturer_dto_1.CreateManufacturerDto]),
    __metadata("design:returntype", void 0)
], ManufacturersController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, api_errors_decorator_1.ApiErrors)(401, 403, 404),
    (0, swagger_1.ApiOperation)({ summary: '[ADMIN] Cập nhật tên hãng sản xuất' }),
    (0, swagger_1.ApiOkResponse)({ type: manufacturer_response_dto_1.ManufacturerResponseDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_manufacturer_dto_1.UpdateManufacturerDto]),
    __metadata("design:returntype", void 0)
], ManufacturersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, api_errors_decorator_1.ApiErrors)(401, 403, 404, 409),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '[ADMIN] Xóa hãng; chặn khi còn sản phẩm, kể cả đã xóa mềm',
    }),
    (0, swagger_1.ApiOkResponse)({ type: manufacturer_response_dto_1.DeleteManufacturerResponseDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ManufacturersController.prototype, "remove", null);
exports.ManufacturersController = ManufacturersController = __decorate([
    (0, swagger_1.ApiTags)('Manufacturers'),
    (0, api_errors_decorator_1.ApiErrors)(400, 429),
    (0, common_1.Controller)('manufacturers'),
    __metadata("design:paramtypes", [manufacturers_service_1.ManufacturersService])
], ManufacturersController);
//# sourceMappingURL=manufacturers.controller.js.map