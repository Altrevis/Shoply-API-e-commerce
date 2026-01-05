import express from 'express';
import OAuth2Server from 'oauth2-server';
import oauth from '../auth/oauthServer.js';

const router = express.Router();

router.post('/token', async (req, res, next) => {
  const request = new OAuth2Server.Request({
    ...req,
    body: req.body,
    headers: { ...req.headers, 'content-type': 'application/x-www-form-urlencoded' }
  });
  const response = new OAuth2Server.Response(res);

  try {
    const token = await oauth.token(request, response);
    res.json(token);
  } catch (err) {
    next(err);
  }
});

router.post('/revoke', async (req, res, next) => {
  const request = new OAuth2Server.Request({
    ...req,
    body: req.body,
    headers: { ...req.headers, 'content-type': 'application/x-www-form-urlencoded' }
  });
  const response = new OAuth2Server.Response(res);
  try {
    const result = await oauth.revoke(request, response);
    res.json({ revoked: result });
  } catch (err) {
    next(err);
  }
});

export default router;
