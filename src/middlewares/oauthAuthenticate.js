import oauth from '../auth/oauthServer.js';

export default function oauthAuthenticate() {
  return async (req, res, next) => {
    const request = new oauth.Request(req);
    const response = new oauth.Response(res);

    try {
      const token = await oauth.authenticate(request, response);
      req.oauth = { token, user: token.user };
      next();
    } catch (err) {
      res.status(err.code || 401).json({ error: err.name, message: err.message });
    }
  };
}
