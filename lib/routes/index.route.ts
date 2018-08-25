// /lib/routes/index.ts
import { Request, Response } from 'express'

import ArticleRoutes from './article.route'
import UserRoutes from './user.route'

export class Routes {

  public articleRoutes: ArticleRoutes = new ArticleRoutes()
  public userRoutes: UserRoutes = new UserRoutes()

  public routes(app): void {
    app.route('/')
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: 'System checking: healthy'
        })
      })

    this.articleRoutes.routes(app)

    this.userRoutes.routes(app)
  }
}