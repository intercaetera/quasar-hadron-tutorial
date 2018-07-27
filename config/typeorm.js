const entitySchemas = require('./entities');

module.exports = {
  connectionName: 'mysqlConnection',
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'toor',
  database: 'blog',
  entitySchemas,
  synchronize: true,
};
