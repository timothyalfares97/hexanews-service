import * as validate from 'express-validation'

import { UserController } from '../controllers/user.controller'
import validation from '../validations/user.validation'

export default class UserRoutes {

  public userController: UserController = new UserController()

  public routes(app): void {

    app.route('/users')
      .post(validate(validation.addNewUser), this.userController.addNewUser)

    app.route('/users/:userId')
      .get(validate(validation.getUser), this.userController.getUser)

      .put(validate(validation.updateUser), this.userController.updateUser)

      .delete(validate(validation.deleteUser), this.userController.deleteUser)
  }
}
