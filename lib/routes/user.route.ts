/**
 * Specify all routes for user
 * Validate inputs where necessary
 */

import * as validate from 'express-validation'

import { UserController } from '../controllers/user.controller'
import validation from '../validations/user.validation'
import Config from '../constants/config'

export default class UserRoutes {

  public userController: UserController = new UserController()

  public routes(app): void {

    /**
     * api/users
     */
    app.route(Config.ENDPOINT.users)
      // GET - Get all existing users
      .get(this.userController.getAll)
      // POST - Create a new user
      .post(validate(validation.create), this.userController.create)

    /**
     * api/users/:userId
     */
    app.route(Config.ENDPOINT.user)
      // GET - Get a user with the specified ID
      .get(validate(validation.get), this.userController.get)
      // PUT - Find and update a user with the specified ID
      .put(validate(validation.update), this.userController.update)
      // DELETE - Delete a user with the specified ID
      .delete(validate(validation.delete), this.userController.delete)
  }
}
