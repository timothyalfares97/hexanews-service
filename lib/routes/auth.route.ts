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
     * POST api/auth/login
     * Log in the user
     */
    app.route(Config.ENDPOINT.login)
      .post(validate(validation.login), this.authController.login)

    /**
     * POST api/auth/changePassword
     * Change a user's password
     */
    app.route(Config.ENDPOINT.changePassword)
      .post(validate(validation.changePassword), this.authController.changePassword)

    /**
     * POST api/auth/resetPassword
     * Reset a user's password
     */
    app.route(Config.ENDPOINT.resetPassword)
      .post(validate(validation.resetPassword), this.authController.resetPassword)
  }
}