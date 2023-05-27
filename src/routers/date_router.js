/**
 * Express Router
 */
const DateRouter = require('express').Router();
const Middleware = require('../controllers/middleware');
/**
  * User controller
*/
const DateController = require('../controllers/date_controller');

DateRouter.use('/dates', Middleware.authorize);

// Demonstration only
DateRouter.route('/dates').get(DateController.getDates);

DateRouter.route('/dates').put(DateController.updateDate);

DateRouter.route('/dates').delete(DateController.removeFromQueueDate);


module.exports = DateRouter;
