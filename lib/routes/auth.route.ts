import { AuthController } from '../controllers/auth.controller'

export default class AuthRoutes {

  public authController: AuthController = new AuthController()

  public routes(app): void {

    app.route('/login')
      .post(this.authController.login)
  }
}