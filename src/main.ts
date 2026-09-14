import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupApp } from './setup-app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupApp(app);
  app.enableShutdownHooks();
  const config = app.get(ConfigService);
  const port = config.getOrThrow<number>('PORT');
  await app.listen(port);
  Logger.log(`API: http://localhost:${port}/api/v1`, 'Bootstrap');
  if (config.get<boolean>('SWAGGER_ENABLED'))
    Logger.log(`Swagger: http://localhost:${port}/docs`, 'Bootstrap');
}
bootstrap().catch((error: unknown) => {
  Logger.error(error, undefined, 'Bootstrap');
  process.exitCode = 1;
});
