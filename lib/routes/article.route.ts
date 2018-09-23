/**
 * Handles routing for article.
 */

import * as validate from 'express-validation'

import { ArticleController } from '../controllers/article.controller'
import validation from '../validations/article.validation'
import Config from '../constants/config'

export default class ArticleRoutes {

  public articleController: ArticleController = new ArticleController()

  public routes(app): void {

    app.route(Config.ENDPOINT.articles)
      .get(this.articleController.getAll)

      .post(validate(validation.create), this.articleController.create)

    app.route(Config.ENDPOINT.article)
      .get(validate(validation.get), this.articleController.get)

      .put(validate(validation.update), this.articleController.update)

      .delete(validate(validation.delete), this.articleController.delete)
  }
}