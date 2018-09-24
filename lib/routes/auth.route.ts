/**
 * Specify all routes for authentication
 * Validate inputs where necessary
 */

import * as validate from 'express-validation'

import { AuthController } from '../controllers/auth.controller'
import validation from '../validations/auth.validation'
import Config from '../constants/config'

export default class AuthRoutes {

  public authController: AuthController = new AuthController()

  public routes(app): void {

    /**
     * /auth/login
     */
    app.route(Config.ENDPOINT.login)
      // POST - Log in the user
      .post(validate(validation.login), this.authController.login)

    /**
     * /auth/changePassword
     */
    app.route(Config.ENDPOINT.changePassword)
      // POST - Change a user's password
      .post(validate(validation.changePassword), this.authController.changePassword)

    /**
     * /auth/resetPassword
     */
    app.route(Config.ENDPOINT.resetPassword)
      // POST - Reset a user's password
      .post(validate(validation.resetPassword), this.authController.resetPassword)
  }
}