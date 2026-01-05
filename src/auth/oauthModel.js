import crypto from 'crypto';
import { OauthClient, OauthAccessToken, OauthRefreshToken, User } from '../models/index.js';
import bcrypt from 'bcrypt';

function generateToken() {
  return crypto.randomBytes(40).toString('hex');
}

export async function getClient(clientId, clientSecret) {
  const client = await OauthClient.findOne({ where: { client_id: clientId } });
  if (!client) return null;

  if (clientSecret) {
    const isMatch = await bcrypt.compare(clientSecret, client.client_secret);
    if (!isMatch) return null;
  }

  let grants = ['password', 'refresh_token'];
  if (client.grants) {
    grants = client.grants.split(',').map(g => g.trim());
  }

  return {
    id: client.id,
    clientId: client.client_id,
    grants: grants,
    redirectUris: client.redirect_uris ? client.redirect_uris.split(',') : []
  };
}

export async function getUser(username, password) {
  const user = await User.findOne({ where: { email: username } });
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  return { id: user.id, email: user.email };
}

export async function saveToken(token, client, user) {
  const access = await OauthAccessToken.create({
    access_token: token.accessToken,
    access_token_expires_at: token.accessTokenExpiresAt,
    client_id: client.id || client.clientId,
    user_id: user.id
  });

  const refresh = await OauthRefreshToken.create({
    refresh_token: token.refreshToken,
    refresh_token_expires_at: token.refreshTokenExpiresAt,
    client_id: client.id || client.clientId,
    user_id: user.id
  });

  return {
    accessToken: access.access_token,
    accessTokenExpiresAt: access.access_token_expires_at,
    refreshToken: refresh.refresh_token,
    refreshTokenExpiresAt: refresh.refresh_token_expires_at,
    client: { id: client.id || client.clientId },
    user: { id: user.id }
  };
}

export async function getAccessToken(accessToken) {
  const row = await OauthAccessToken.findOne({ where: { access_token: accessToken } });
  if (!row) return null;
  return {
    accessToken: row.access_token,
    accessTokenExpiresAt: row.access_token_expires_at,
    client: { id: row.client_id },
    user: { id: row.user_id }
  };
}

export async function getRefreshToken(refreshToken) {
  const row = await OauthRefreshToken.findOne({ where: { refresh_token: refreshToken } });
  if (!row) return null;
  return {
    refreshToken: row.refresh_token,
    refreshTokenExpiresAt: row.refresh_token_expires_at,
    client: { id: row.client_id },
    user: { id: row.user_id }
  };
}

export async function revokeToken(token) {
  const deleted = await OauthRefreshToken.destroy({ where: { refresh_token: token.refreshToken } });
  return deleted > 0;
}
