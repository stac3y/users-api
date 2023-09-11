module.exports = {
  development: {
    dialect: 'postgres',
    host: process.env.PSQL_HOST,
    port: process.env.PSQL_PORT,
    username: process.env.PSQL_USERNAME,
    password: process.env.PSQL_PASSWORD,
    database: process.env.PSQL_DATABASE,
  },
  test: {
    dialect: 'postgres',
    host: process.env.PSQL_HOST,
    port: process.env.PSQL_PORT,
    username: process.env.PSQL_USERNAME,
    password: process.env.PSQL_PASSWORD,
    database: process.env.PSQL_DATABASE,
  },
  production: {
    dialect: 'postgres',
    host: process.env.PSQL_HOST,
    port: process.env.PSQL_PORT,
    username: process.env.PSQL_USERNAME,
    password: process.env.PSQL_PASSWORD,
    database: process.env.PSQL_DATABASE,
  },
};
