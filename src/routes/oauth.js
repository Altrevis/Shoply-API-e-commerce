// src/routes/oauth.js
import express from 'express';
import oauth from '../auth/oauthServer.js';

const router = express.Router();

// Body parser must be active in server (app.use(express.urlencoded({ extended: true })) and express.json())

// Token endpoint
router.post('/token', async (req, res, next) => {
  const request = new oauth.Request(req);
  const response = new oauth.Response(res);

  try {
    const token = await oauth.token(request, response);
    res.json(token);
  } catch (err) {
    next(err);
  }
});

// Optional: revoke token endpoint (logout)
router.post('/revoke', async (req, res, next) => {
  const request = new oauth.Request(req);
  const response = new oauth.Response(res);
  try {
    const result = await oauth.revoke(request, response);
    res.json({ revoked: result });
  } catch (err) {
    next(err);
  }
});

export default router;
