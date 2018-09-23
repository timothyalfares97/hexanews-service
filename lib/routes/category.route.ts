/**
 * Handles routing for article.
 */

import { CategoryController } from '../controllers/category.controller'
import Config from '../constants/config'

export default class CategoryRoutes {

  public categoryController: CategoryController = new CategoryController()

  public routes(app): void {

    app.route(Config.ENDPOINT.categories)
      .get(this.categoryController.getAll)
  }
}