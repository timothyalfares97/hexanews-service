/**
 * Main router of the application when the api is used
 * Route to the next router based on the path
 */

import ArticleRoutes from './article.route'
import AuthRoutes from './auth.route'
import CategoryRoutes from './category.route'
import UserRoutes from './user.route'

export class Routes {

  public articleRoutes: ArticleRoutes = new ArticleRoutes()
  public authRoutes: AuthRoutes = new AuthRoutes()
  public categoryRoutes: CategoryRoutes = new CategoryRoutes()
  public userRoutes: UserRoutes = new UserRoutes()

  public routes(app): void {

    /**
     * Routes for article
     */
    this.articleRoutes.routes(app)

    /**
     * Routes for authentication
     */
    this.authRoutes.routes(app)

    /**
     * Routes for category
     */
    this.categoryRoutes.routes(app)

    /**
     * Routes for user
     */
    this.userRoutes.routes(app)
  }
}