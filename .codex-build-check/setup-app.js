"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = setupApp;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = __importDefault(require("helmet"));
function setupApp(app) {
    const config = app.get(config_1.ConfigService);
    app.use((0, helmet_1.default)());
    app.setGlobalPrefix('api/v1');
    app.enableCors({
        origin: config
            .get('CORS_ORIGINS', '')
            .split(',')
            .map((origin) => origin.trim())
            .filter(Boolean),
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    if (config.get('SWAGGER_ENABLED')) {
        const document = swagger_1.SwaggerModule.createDocument(app, new swagger_1.DocumentBuilder()
            .setTitle('Phụ Tùng Hoàng Long API')
            .setDescription('Authentication với JWT, refresh token rotation và phân quyền USER/ADMIN.')
            .setVersion('1.0.0')
            .addBearerAuth()
            .build());
        swagger_1.SwaggerModule.setup('docs', app, document, {
            jsonDocumentUrl: 'docs-json',
            swaggerOptions: { persistAuthorization: false },
        });
    }
}
//# sourceMappingURL=setup-app.js.map