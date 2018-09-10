/**
 * Schema model for article.
 */

import * as mongoose from 'mongoose'

import Config from '../constants/config'

const Schema = mongoose.Schema

export const ArticleSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  authorId: {
    type: String
  },
  category: {
    type: String
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

ArticleSchema.pre(Config.SAVE, async function(next) {

  const article = this
  try {
    const randomizeViews = Math.floor(Math.random() * Math.floor(Config.MAX_VIEWS))
    article.views = randomizeViews
    next()
  } catch (err) {
    return next(err)
  }

})