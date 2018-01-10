const jwt = require('jsonwebtoken');
const auth = require('../../config/auth');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check token in header
  if (!authHeader)
    return res.status(400).send('No token provided');

  const parts = authHeader.split(' ');

  if (!parts.length === 2)
    return res.status(400).send('Token not present');

  const [ scheme, token ] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(400).send('Token malformatted');

  jwt.verify(token, auth.secret, (err, decoded) => {
    if (err) return res.status(400).send('Token invalid');

    req.userId = decoded.id;
    return next();
  });
};
