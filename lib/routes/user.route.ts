import { UserController } from 'controllers/user.controller'

export default class UserRoutes {

  public userController: UserController = new UserController()

  public routes(app): void {

    app.route('/')
      .post(this.userController.addNewUser)

    app.route('/:userId')
      .get(this.userController.getUser)

      .put(this.userController.updateUser)

      .delete(this.userController.deleteUser)
  }
}
