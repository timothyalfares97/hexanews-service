import { UserController } from '../controllers/user.controller'

export default class UserRoutes {

  public userController: UserController = new UserController()

  public routes(app): void {

    app.route('/users')
      .post(this.userController.addNewUser)

    app.route('/users/:userId')
      .get(this.userController.getUser)

      .put(this.userController.updateUser)

      .delete(this.userController.deleteUser)
  }
}
