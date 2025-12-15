// src/auth/oauthServer.js
import OAuth2Server from 'oauth2-server';
import * as oauthModel from './oauthModel.js';

const oauth = new OAuth2Server({
  model: oauthModel,
  accessTokenLifetime: 60 * 60, // 1h
  refreshTokenLifetime: 60 * 60 * 24 * 30, // 30 days
  allowBearerTokensInQueryString: true
});

export default oauth;
