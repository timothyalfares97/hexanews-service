/**
 * Entry point of the server app
 * Configures the server
 */

import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as mongoose from 'mongoose'
import * as cors from 'cors'
import * as helmet from 'helmet'
import * as dotenv from 'dotenv'

import Config from './constants/config'
import { Routes } from './routes/index.route'

class App {

  public app: express.Application
  public routePrv: Routes = new Routes()
  public mongoUrl: string = ''

  constructor() {
    this.app = express()
    this.config()
    this.routePrv.routes(this.app)
    this.mongoSetup()
  }

  private config(): void {
    // Loads all sensitive information from the environment variables
    dotenv.config()

    this.app.use(cors())
    this.app.use(bodyParser.json({ limit: Config.JSON_LIMIT }))
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(helmet())
  }

  private mongoSetup(): void {
    this.mongoUrl =  process.env.MONGO_DB_URL
    mongoose.Promise = global.Promise
    mongoose.connect(this.mongoUrl)
  }

}

export default new App().app