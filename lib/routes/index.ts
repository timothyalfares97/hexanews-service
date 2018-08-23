// /lib/routes/index.ts
import { Request, Response } from 'express'

import { ArticleController } from '../controllers'

export class Routes {

  public articleController: ArticleController = new ArticleController()

  public routes(app): void {
    app.route('/')
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: 'System checking: healthy'
        })
      })

    app.route('/article')
      .get(this.articleController.getArticles)

      .post(this.articleController.addNewArticle)

    app.route('/article/:articleId')
      .get(this.articleController.getArticle)

      .put(this.articleController.updateArticle)

      .delete(this.articleController.deleteArticle)
  }
}