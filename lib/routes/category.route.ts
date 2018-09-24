/**
 * Specify all routes for category
 */

import { CategoryController } from '../controllers/category.controller'
import Config from '../constants/config'

export default class CategoryRoutes {

  public categoryController: CategoryController = new CategoryController()

  public routes(app): void {

    /**
     * /categories
     */
    app.route(Config.ENDPOINT.categories)
      // GET - Get all existing categories
      .get(this.categoryController.getAll)
  }
}