/**
 * Controller for Article. Handles CRUD operation.
 */

import * as mongoose from 'mongoose'
import * as jwt from 'jsonwebtoken'
import { Request, Response } from 'express'

import { ArticleSchema } from '../models/article.model'
import Config from '../constants/config'

const Article = mongoose.model('Article', ArticleSchema)

export class ArticleController {

  /**
   * Create a new article into the database.
   */
  public create = async (req: Request, res: Response) => {

    const newArticle = new Article(req.body)
    const token = req.headers.token

    try {
      await jwt.verify(token, Config.JWT_KEY)
      const savedArticle = await newArticle.save()
      res.json({ message: savedArticle, code: 'SUCCESS' })
    } catch (err) {
      res.send({ message: err, code: 'ERROR' })
    }

  }

  /**
   * Get all articles from the database.
   */
  public getAll = async (req: Request, res: Response) => {

    try {
      const articles = await Article.find()
      res.json(articles)
    } catch (err) {
      res.send(err)
    }

  }

  /**
   * Get a single article based on its id.
   */
  public get = async (req: Request, res: Response) => {

    try {
      const article = await Article.findById(req.params.articleId)
      res.json(article)
    } catch (err) {
      res.send(err)
    }

  }

  /**
   * Find and update an article based on its id.
   */
  public update = async (req: Request, res: Response) => {

    const updateCondition = { _id: req.params.articleId }
    const article = req.body
    const updateOption = { new: true }
    const token = req.headers.token

    try {
      await jwt.verify(token, Config.JWT_KEY)
      const edittedArticle = await Article.findOneAndUpdate(updateCondition, article, updateOption)
      res.json({ message: edittedArticle, code: 'SUCCESS' })
    } catch (err) {
      res.send({ message: err, code: 'ERROR' })
    }

  }

  /**
   * Delete an article based on its id.
   */
  public delete = async (req: Request, res: Response) => {

    const deleteCondition = { _id: req.params.articleId }
    const token = req.headers.token

    try {
      await jwt.verify(token, Config.JWT_KEY)
      await Article.remove(deleteCondition)
      res.json({ message: 'article deleted', code: 'SUCCESS' })
    } catch (err) {
      res.send({ message: err, code: 'ERROR' })
    }

  }
}
