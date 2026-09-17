"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateManufacturerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_manufacturer_dto_1 = require("./create-manufacturer.dto");
class UpdateManufacturerDto extends (0, swagger_1.PartialType)(create_manufacturer_dto_1.CreateManufacturerDto, {
    skipNullProperties: false,
}) {
}
exports.UpdateManufacturerDto = UpdateManufacturerDto;
//# sourceMappingURL=update-manufacturer.dto.js.map