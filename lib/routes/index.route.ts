/**
 * Handles routing for main application.
 */

import ArticleRoutes from './article.route'
import AuthRoutes from './auth.route'
import CategoryRoutes from './category.route'
import UserRoutes from './user.route'

export class Routes {

  public articleRoutes: ArticleRoutes = new ArticleRoutes()
  public userRoutes: UserRoutes = new UserRoutes()
  public authRoutes: AuthRoutes = new AuthRoutes()
  public categoryRoutes: CategoryRoutes = new CategoryRoutes()

  public routes(app): void {

    this.articleRoutes.routes(app)

    this.userRoutes.routes(app)

    this.authRoutes.routes(app)

    this.categoryRoutes.routes(app)
  }
}