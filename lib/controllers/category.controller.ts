/**
 * Controller for Category. Handles CRUD operation.
 */

import * as mongoose from 'mongoose'
import { Request, Response } from 'express'

import { CategorySchema } from '../models/category.model'

const Category = mongoose.model('Category', CategorySchema)

export class CategoryController {

  /**
   * Get all categories from the database.
   */
  public getAll = async (_: Request, res: Response) => {

    try {
      const categories = await Category.find()
      res.json(categories)
    } catch (err) {
      res.send(err)
    }

  }
}
