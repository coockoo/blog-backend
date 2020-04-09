function getEnv(envName, defaultValue, type = 'string') {
  const val = process.env[envName];
  if (type === 'int') {
    return +val || defaultValue;
  }
  if (type === 'boolean') {
    return val === 'true' || defaultValue;
  }
  return val || defaultValue;
}

const env = getEnv('NODE_ENV', 'development');

module.exports = {
  port: getEnv('PORT', 3000, 'int'),
  env,
  knex: {
    client: 'pg',
    connection: {
      host: getEnv('DB_HOST', 'localhost'),
      user: getEnv('DB_USER', 'app'),
      password: getEnv('DB_PASSWORD', 'app'),
      database: getEnv('DB_NAME', 'blogdb'),
    },
    // debug: env === 'development',
  },
  jwtSecret: getEnv('JWT_SECRET', 'so secret that it hurts a b1t'),
};
