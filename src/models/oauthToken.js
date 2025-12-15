// src/models/oauthToken.js
export default (sequelize, DataTypes) => {
  const OauthToken = sequelize.define('OauthToken', {
    access_token: { type: DataTypes.STRING, unique: true },
    access_token_expires_at: DataTypes.DATE,
    refresh_token: { type: DataTypes.STRING, unique: true },
    refresh_token_expires_at: DataTypes.DATE,
    scope: DataTypes.STRING,
  }, {
    tableName: 'oauth_tokens',
    underscored: true,
    timestamps: true,
  });

  return OauthToken;
};
 