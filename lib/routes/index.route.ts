/**
 * Handles routing for main application.
 */

import { Request, Response } from 'express'

import ArticleRoutes from './article.route'
import UserRoutes from './user.route'
import AuthRoutes from './auth.route'
import Strings from '../constants/string'

export class Routes {

  public articleRoutes: ArticleRoutes = new ArticleRoutes()
  public userRoutes: UserRoutes = new UserRoutes()
  public authRoutes: AuthRoutes = new AuthRoutes()

  public routes(app): void {
    app.route('/')
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: Strings.SYSTEM_CHECK_HEALTHY
        })
      })

    this.articleRoutes.routes(app)

    this.userRoutes.routes(app)

    this.authRoutes.routes(app)
  }
}