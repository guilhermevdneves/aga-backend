/**
 * Express Router
 */
const UserRouter = require('express').Router();

const Middleware = require('../controllers/middleware');
/**
  * User controller
*/
const UserController = require('../controllers/user_controller');

// Demonstration only
UserRouter.route('/user').post(UserController.createUser);

UserRouter.route('/user/:id').get(Middleware.authorize, Middleware.isAdmin, UserController.getUserDetails);

module.exports = UserRouter;
