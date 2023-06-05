const { StatusCodes } = require('http-status-codes');
const config = require('config');
const jwt = require('jsonwebtoken');
const UserDAO = require('../dao/schemas/AGAUser');

const Middleware = {
  authorize(request, response, next) {
    console.log('Checking required credentials');

    const token = request.headers.authorization;
    console.log(request.params)
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
  async isAdmin(request, response, next) {
    const {
      userId,
    } = request;

    try {
      const user = await UserDAO.findOne({ _id: userId });
      if (!user || !user.admin) {
        return next({
          status: StatusCodes.UNAUTHORIZED,
          message: 'Missing Authorization Header',
        });
      }
      return next();
    } catch (err) {
      console.error(err);

      return next({
        status: StatusCodes.UNAUTHORIZED,
        message: 'ERROR',
      });
    }
  },
};

module.exports = Middleware;
