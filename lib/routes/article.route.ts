import { ArticleController } from 'controllers/article.controller'

export default class ArticleRoutes {

  public articleController: ArticleController = new ArticleController()

  public routes(app): void {

    app.route('/')
      .get(this.articleController.getArticles)

      .post(this.articleController.addNewArticle)

    app.route('/:articleId')
      .get(this.articleController.getArticle)

      .put(this.articleController.updateArticle)

      .delete(this.articleController.deleteArticle)
  }
}