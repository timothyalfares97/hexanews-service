/**
 * Controller for Category. Handles CRUD operation.
 */

import * as mongoose from 'mongoose'
import { Request, Response } from 'express'

import { CategorySchema } from '../models/category.model'
import Config from '../constants/config'

const Category = mongoose.model('Category', CategorySchema)

export class CategoryController {

  /**
   * Get all categories from the database.
   */
  public getAll = async (_: Request, res: Response) => {

    try {
      const categories = await Category.find()
      res.json({ message: categories, code: Config.RESPONSE_CODE.success })
    } catch (err) {
      res.send({ message: err, code: Config.RESPONSE_CODE.error })
    }

  }
}
