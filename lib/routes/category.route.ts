/**
 * Handles routing for article.
 */

import { CategoryController } from '../controllers/category.controller'

export default class CategoryRoutes {

  public categoryController: CategoryController = new CategoryController()

  public routes(app): void {

    app.route('/categories')
      .get(this.categoryController.getAll)
  }
}