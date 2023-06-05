const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');
const UserDAO = require('../dao/schemas/AGAUser');

const AuthenticationController = {
  async createUser(request, response, next) {
    try {
      const {
        body: {
          name,
          number,
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
        number,
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
  async getUserDetails(request, response, next) {
    try {
      const {
        params: {
          id,
        },
      } = request;
      const user = await UserDAO.findOne({ _id: id });

      if (!user) {
        return response.status(403).json({ message: 'User doesnt exists' });
      }

      return response.status(StatusCodes.OK).json(user);
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
