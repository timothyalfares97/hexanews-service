/**
 * Schema model for Category.
 */

import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

export const CategorySchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
})
