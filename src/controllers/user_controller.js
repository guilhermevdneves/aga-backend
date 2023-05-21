const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');
const UserDAO = require('../dao/schemas/AGAUser');

const AuthenticationController = {
  async createUser(request, response, next) {
    try {
      const {
        body: {
          name,
          email,
          username,
          password,
        },
      } = request;

      const sal = bcrypt.genSaltSync(10);

      const user = await UserDAO.findOne({ username });

      if (user) {
        return response.status(403).json({ message: 'User already exists' });
      }

      await UserDAO.create({
        username,
        name,
        email,
        password: bcrypt.hashSync(password, sal),
      });

      return response.status(StatusCodes.OK).send();
    } catch (error) {
      const errorMessage = {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error,
      };
      return next(errorMessage);
    }
  },
};

module.exports = AuthenticationController;
