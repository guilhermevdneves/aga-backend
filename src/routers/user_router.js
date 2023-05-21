/**
 * Express Router
 */
const UserRouter = require('express').Router();

/**
  * User controller
*/
const UserController = require('../controllers/user_controller');

// Demonstration only
UserRouter.route('/user').post(UserController.createUser);

module.exports = UserRouter;
