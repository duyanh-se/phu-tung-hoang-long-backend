import { validateEnv } from './env.validation';

describe('environment validation', () => {
  const valid = {
    DATABASE_URL: 'postgresql://localhost/test',
    JWT_ACCESS_SECRET: 'a'.repeat(48),
  };
  it('sets typed defaults and disables Swagger by default in production', () => {
    expect(validateEnv({ ...valid, NODE_ENV: 'production' })).toMatchObject({
      PORT: 3000,
      JWT_ACCESS_TTL_SECONDS: 900,
      SWAGGER_ENABLED: false,
    });
  });
  it.each([
    { JWT_ACCESS_SECRET: 'short' },
    {
      JWT_ACCESS_SECRET: 'replace-with-a-random-secret-at-least-32-characters',
    },
    { DATABASE_URL: 'mysql://localhost/test' },
    { PORT: 'NaN' },
    { PORT: 0 },
    { JWT_ACCESS_TTL_SECONDS: -1 },
    { REFRESH_TOKEN_TTL_DAYS: 0 },
    { SWAGGER_ENABLED: 'yes' },
  ])('rejects invalid settings %p', (override) => {
    expect(() => validateEnv({ ...valid, ...override })).toThrow();
  });
});
