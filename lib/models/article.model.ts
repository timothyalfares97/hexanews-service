import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

export const ArticleSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  author: {
    type: String
  },
  category: {
    type: String
  },
  created_date: {
    type: Date,
    default: Date.now
  }
})