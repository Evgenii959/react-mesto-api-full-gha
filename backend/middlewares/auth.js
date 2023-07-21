const jwt = require('jsonwebtoken');
const Error401 = require('../errors/error401');

const { NODE_ENV, JWT_SECRET } = process.env;

const authMiddleware = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new Error401('Токен не найден'));
    return;
  }
  try {
    req.user = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'asdcqwcqwcdqwcq');
    next();
  } catch (err) {
    next(new Error401('Токен не найден'));
  }
};

module.exports = authMiddleware;
