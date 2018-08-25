// /lib/routes/index.ts
import { Request, Response } from 'express'

import ArticleRoutes from './article.route'
import UserRoutes from './user.route'

export class Routes {

  public routes(app): void {
    app.route('/')
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: 'System checking: healthy'
        })
      })

    app.route('/articles', ArticleRoutes)

    app.route('/users', UserRoutes)
  }
}