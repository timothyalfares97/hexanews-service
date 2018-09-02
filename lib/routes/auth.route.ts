/**
 * Handles routing for authentication.
 */
import * as validate from 'express-validation'

import { AuthController } from '../controllers/auth.controller'
import validation from '../validations/auth.validation'

export default class AuthRoutes {

  public authController: AuthController = new AuthController()

  public routes(app): void {

    app.route('/auth/login')
      .post(validate(validation.login), this.authController.login)

    app.route('/auth/changePassword')
      .post(validate(validation.changePassword), this.authController.changePassword)

    app.route('/auth/resetPassword')
      .post(validate(validation.resetPassword), this.authController.resetPassword)
  }
}