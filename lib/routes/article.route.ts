/**
 * Specify all routes for article
 * Validate inputs where necessary
 */

import * as validate from 'express-validation'

import { ArticleController } from '../controllers/article.controller'
import validation from '../validations/article.validation'
import Config from '../constants/config'

export default class ArticleRoutes {

  public articleController: ArticleController = new ArticleController()

  public routes(app): void {

    /**
     * /articles
     */
    app.route(Config.ENDPOINT.articles)
      // GET - Get all existing articles
      .get(this.articleController.getAll)
      // POST - Create a new article
      .post(validate(validation.create), this.articleController.create)

    /**
     * /articles/:articleId
     */
    app.route(Config.ENDPOINT.article)
      // GET - Get an article with the specified ID
      .get(validate(validation.get), this.articleController.get)
      // PUT - Find and update an article with the specified ID
      .put(validate(validation.update), this.articleController.update)
      // DELETE - Delete an article with the specified ID
      .delete(validate(validation.delete), this.articleController.delete)
  }
}