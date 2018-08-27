import * as validate from 'express-validation'

import { ArticleController } from '../controllers/article.controller'
import validation from '../validations/article.validation'

export default class ArticleRoutes {

  public articleController: ArticleController = new ArticleController()

  public routes(app): void {

    app.route('/articles')
      .get(this.articleController.getArticles)

      .post(validate(validation.addNewArticle), this.articleController.addNewArticle)

    app.route('/articles/:articleId')
      .get(validate(validation.getArticle), this.articleController.getArticle)

      .put(validate(validation.updateArticle), this.articleController.updateArticle)

      .delete(validate(validation.deleteArticle), this.articleController.deleteArticle)
  }
}