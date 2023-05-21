const { StatusCodes } = require('http-status-codes');
const config = require('config');
const jwt = require('jsonwebtoken');

const Middleware = {
  authorize(request, response, next) {
    console.log('Checking required credentials');
    const {
      userId,
      params,
    } = request;
    console.log({ params, userId });

    const token = request.headers.authorization;

    if (!token) {
      console.log('Missing required credentials');

      return next({
        status: StatusCodes.UNAUTHORIZED,
        message: 'Missing Authorization Header',
      });
    }

    try {
      const decoded = jwt.verify(token, config.jwt.secret);
      request.userId = decoded.userId;
    } catch (err) {
      console.error(err);

      return next({
        status: StatusCodes.UNAUTHORIZED,
        message: 'Invalid token',
      });
    }

    return next();
  },
};

module.exports = Middleware;
