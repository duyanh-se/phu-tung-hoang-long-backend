import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UsersController } from '../../users/users.controller';
import { UsersService } from '../../users/users.service';

describe('Users pagination OpenAPI contract', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: {} }],
    }).compile();
    app = module.createNestApplication();
    app.setGlobalPrefix('api/v1');
  });

  afterAll(async () => {
    await app.close();
  });

  it.each([
    ['page', 1, 1000000],
    ['limit', 20, 100],
  ])(
    'documents %s as an optional integer, not an object',
    (name, defaultValue, maximum) => {
      const document = SwaggerModule.createDocument(
        app,
        new DocumentBuilder().build(),
      );
      const parameter = document.paths['/api/v1/users'].get?.parameters?.find(
        (item) => 'name' in item && item.name === name,
      );
      expect(parameter).toEqual({
        name,
        in: 'query',
        required: false,
        schema: { type: 'integer', default: defaultValue, minimum: 1, maximum },
      });
    },
  );
});
