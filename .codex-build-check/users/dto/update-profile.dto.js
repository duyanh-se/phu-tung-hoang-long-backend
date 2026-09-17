"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProfileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const register_dto_1 = require("../../auth/dto/register.dto");
class UpdateProfileDto extends (0, swagger_1.PartialType)((0, swagger_1.PickType)(register_dto_1.RegisterDto, ['fullName']), { skipNullProperties: false }) {
}
exports.UpdateProfileDto = UpdateProfileDto;
//# sourceMappingURL=update-profile.dto.js.map