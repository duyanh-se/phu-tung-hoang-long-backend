"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiErrors = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const error_response_dto_1 = require("../dto/error-response.dto");
const ApiErrors = (...statuses) => (0, common_1.applyDecorators)(...statuses.map((status) => (0, swagger_1.ApiResponse)({ status, type: error_response_dto_1.ErrorResponseDto })));
exports.ApiErrors = ApiErrors;
//# sourceMappingURL=api-errors.decorator.js.map