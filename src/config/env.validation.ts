export function validateEnv(env: Record<string, unknown>) {
  const result = { ...env };
  const databaseUrl = String(env.DATABASE_URL ?? '');
  if (!/^postgres(ql)?:\/\//.test(databaseUrl)) {
    throw new Error('DATABASE_URL must be a PostgreSQL connection string');
  }
  const secret = String(env.JWT_ACCESS_SECRET ?? '');
  if (secret.length < 32 || secret.startsWith('replace-with-')) {
    throw new Error(
      'JWT_ACCESS_SECRET must be a random secret of at least 32 characters',
    );
  }
  for (const [key, fallback, max] of [
    ['PORT', 3000, 65535],
    ['JWT_ACCESS_TTL_SECONDS', 900, 86400],
    ['REFRESH_TOKEN_TTL_DAYS', 7, 365],
  ] as const) {
    const value = Number(env[key] ?? fallback);
    if (!Number.isInteger(value) || value < 1 || value > max) {
      throw new Error(`${key} must be an integer between 1 and ${max}`);
    }
    result[key] = value;
  }
  const nodeEnv = String(env.NODE_ENV ?? 'development');
  if (!['development', 'test', 'production'].includes(nodeEnv)) {
    throw new Error('NODE_ENV must be development, test or production');
  }
  result.NODE_ENV = nodeEnv;
  const swagger =
    env.SWAGGER_ENABLED ?? (nodeEnv !== 'production' ? 'true' : 'false');
  if (!['true', 'false'].includes(String(swagger))) {
    throw new Error('SWAGGER_ENABLED must be true or false');
  }
  result.SWAGGER_ENABLED = String(swagger) === 'true';
  return result;
}
