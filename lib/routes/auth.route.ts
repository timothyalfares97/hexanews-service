/**
 * Handles routing for authentication.
 */

import * as validate from 'express-validation'

import { AuthController } from '../controllers/auth.controller'
import validation from '../validations/auth.validation'
import Config from '../constants/config'

export default class AuthRoutes {

  public authController: AuthController = new AuthController()

  public routes(app): void {

    app.route(Config.ENDPOINT.login)
      .post(validate(validation.login), this.authController.login)

    app.route(Config.ENDPOINT.changePassword)
      .post(validate(validation.changePassword), this.authController.changePassword)

    app.route(Config.ENDPOINT.resetPassword)
      .post(validate(validation.resetPassword), this.authController.resetPassword)
  }
}