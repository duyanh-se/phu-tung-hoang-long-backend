"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const setup_app_1 = require("./setup-app");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    (0, setup_app_1.setupApp)(app);
    app.enableShutdownHooks();
    const config = app.get(config_1.ConfigService);
    const port = config.getOrThrow('PORT');
    await app.listen(port);
    common_1.Logger.log(`API: http://localhost:${port}/api/v1`, 'Bootstrap');
    if (config.get('SWAGGER_ENABLED'))
        common_1.Logger.log(`Swagger: http://localhost:${port}/docs`, 'Bootstrap');
}
bootstrap().catch((error) => {
    common_1.Logger.error(error, undefined, 'Bootstrap');
    process.exitCode = 1;
});
//# sourceMappingURL=main.js.map