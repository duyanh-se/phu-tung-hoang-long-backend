import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

export function setupApp(app: INestApplication) {
  const config = app.get(ConfigService);
  app.use(helmet());
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: config
      .get<string>('CORS_ORIGINS', '')
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  if (config.get<boolean>('SWAGGER_ENABLED')) {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Phụ Tùng Hoàng Long API')
        .setDescription(
          'Authentication với JWT, refresh token rotation và phân quyền USER/ADMIN.',
        )
        .setVersion('1.0.0')
        .addBearerAuth()
        .build(),
    );
    SwaggerModule.setup('docs', app, document, {
      jsonDocumentUrl: 'docs-json',
      swaggerOptions: { persistAuthorization: false },
    });
  }
}
