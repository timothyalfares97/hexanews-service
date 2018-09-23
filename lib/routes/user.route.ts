/**
 * Handles routing for user.
 */

import * as validate from 'express-validation'

import { UserController } from '../controllers/user.controller'
import validation from '../validations/user.validation'
import Config from '../constants/config'

export default class UserRoutes {

  public userController: UserController = new UserController()

  public routes(app): void {

    app.route(Config.ENDPOINT.users)
      .get(this.userController.getAll)

      .post(validate(validation.create), this.userController.create)

    app.route(Config.ENDPOINT.user)
      .get(validate(validation.get), this.userController.get)

      .put(validate(validation.update), this.userController.update)

      .delete(validate(validation.delete), this.userController.delete)
  }
}
