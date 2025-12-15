const path = require('path');

module.exports = {
  config: path.resolve('sequelize.config.js'),
  migrationsPath: path.resolve('migrations'),
  seedersPath: path.resolve('seeders'),
  modelsPath: path.resolve('src/models')
};

