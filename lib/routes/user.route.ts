/**
 * Handles routing for user.
 */

import * as validate from 'express-validation'

import { UserController } from '../controllers/user.controller'
import validation from '../validations/user.validation'

export default class UserRoutes {

  public userController: UserController = new UserController()

  public routes(app): void {

    app.route('/users')
      .get(this.userController.getAll)

      .post(validate(validation.create), this.userController.create)

    app.route('/users/:userId')
      .get(validate(validation.get), this.userController.get)

      .put(validate(validation.update), this.userController.update)

      .delete(validate(validation.delete), this.userController.delete)
  }
}
