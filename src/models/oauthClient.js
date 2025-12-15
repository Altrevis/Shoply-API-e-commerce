// src/models/oauthClient.js
export default (sequelize, DataTypes) => {
  const OauthClient = sequelize.define('OauthClient', {
    client_id: { type: DataTypes.STRING, unique: true, allowNull: false },
    client_secret: { type: DataTypes.STRING, allowNull: false },
    name: DataTypes.STRING,
    redirect_uris: DataTypes.TEXT, // CSV of URIs if needed
    grants: DataTypes.STRING, // e.g. "password,refresh_token"
  }, {
    tableName: 'oauth_clients',
    underscored: true,
    timestamps: true,
  });

  return OauthClient;
};
