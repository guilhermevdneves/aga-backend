const { StatusCodes } = require('http-status-codes');
const Dates = require('../dao/schemas/Dates');

const DateController = {
  async getDates(request, response) {
    try {
      const currentDate = new Date();

      const dates = await Dates.find({
        date: {
          $gte: currentDate,
        },
      });

      return response.status(StatusCodes.OK).json(dates);
    } catch (error) {
      const errorMessage = {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error,
      };
      return response.status(403).json(errorMessage);
    }
  },
  async updateDate(request, response) {
    try {
      const {
        userId,
        date,
      } = request.body;
      console.log(userId);
      const result = await Dates.findOne({ date });

      if (!result) {
        const newData = await Dates.create({
          date,
          reservedBy: userId,
        });

        return response.status(StatusCodes.OK).json(newData);
      // eslint-disable-next-line no-else-return
      } else {
        result.reservedBy = userId || undefined;
        await result.save();
        return response.status(StatusCodes.OK).json(result);
      }
    } catch (error) {
      const errorMessage = {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error,
      };
      return response.status(500).json(errorMessage);
    }
  },
  async removeFromQueueDate(request, response, next) {
    try {
      const {
        userId,
        date,
      } = request.body;

      const selectedDate = new Date(date);

      const result = await Dates.find({ date: selectedDate });

      if (!result) {
        return response.status(403).json({ message: 'Erro' });
      }
      const indexToRemove = result.queue.indexOf(userId);
      result.queue.splice(indexToRemove, 1);

      await result.save();

      return response.status(StatusCodes.OK).json(result);
    } catch (error) {
      const errorMessage = {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error,
      };
      return next(errorMessage);
    }
  },
};

module.exports = DateController;
