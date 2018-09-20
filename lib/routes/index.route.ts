/**
 * Handles routing for main application.
 */

import { Request, Response } from 'express'

import ArticleRoutes from './article.route'
import AuthRoutes from './auth.route'
import CategoryRoutes from './category.route'
import Strings from '../constants/string'
import UserRoutes from './user.route'

export class Routes {

  public articleRoutes: ArticleRoutes = new ArticleRoutes()
  public userRoutes: UserRoutes = new UserRoutes()
  public authRoutes: AuthRoutes = new AuthRoutes()
  public categoryRoutes: CategoryRoutes = new CategoryRoutes()

  public routes(app): void {
    app.route('/')
      .get((_: Request, res: Response) => {
        res.status(200).send({
          message: Strings.SYSTEM_CHECK_HEALTHY
        })
      })

    this.articleRoutes.routes(app)

    this.userRoutes.routes(app)

    this.authRoutes.routes(app)

    this.categoryRoutes.routes(app)
  }
}