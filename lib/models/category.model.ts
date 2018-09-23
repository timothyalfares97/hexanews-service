/**
 * Model for category with its attributes and types
 */

import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

/**
 * Specify the attributes and types of category
 */
export const CategorySchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
})
