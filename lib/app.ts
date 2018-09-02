/**
 * Main application.
 */
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as mongoose from 'mongoose'
import * as cors from 'cors'
import * as helmet from 'helmet'

import { Routes } from './routes/index.route'

class App {

  public app: express.Application
  public routePrv: Routes = new Routes()
  public mongoUrl: string = 'mongodb://hexanews:hexanews50!@ds133252.mlab.com:33252/hexanews'

  constructor() {
    this.app = express()
    this.config()
    this.routePrv.routes(this.app)
    this.mongoSetup()
  }

  private config(): void {
    this.app.use(cors())
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(helmet())
  }

  private mongoSetup(): void {
    mongoose.Promise = global.Promise
    mongoose.connect(this.mongoUrl)
  }

}

export default new App().app