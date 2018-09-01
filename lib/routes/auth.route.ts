/**
 * Handles routing for authentication.
 */
import { AuthController } from '../controllers/auth.controller'

export default class AuthRoutes {

  public authController: AuthController = new AuthController()

  public routes(app): void {

    app.route('/auth/login')
      .post(this.authController.login)

    app.route('/auth/changePassword')
      .post(this.authController.changePassword)
  }
}