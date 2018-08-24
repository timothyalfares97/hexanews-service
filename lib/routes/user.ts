import { UserController } from '../controllers/user'

export class Routes {

  public userController: UserController = new UserController()

  public routes(app): void {
    app.route('/user')
      .post(this.userController.addNewUser)

    app.route('/:userId')
      .get(this.userController.getUser)

      .put(this.userController.updateUser)

      .delete(this.userController.deleteUser)
  }
}
