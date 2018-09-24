/**
 * A collection of server methods to handle articles
 */

import * as mongoose from 'mongoose'
import * as jwt from 'jsonwebtoken'
import { Request, Response } from 'express'

import { ArticleSchema } from '../models/article.model'
import Config from '../constants/config'
import Strings from '../constants/string'

const Article = mongoose.model('Article', ArticleSchema)

export class ArticleController {

  /**
   * Create a new article
   */
  public create = async (req: Request, res: Response) => {

    const newArticle = new Article(req.body)
    const token = req.headers.token

    try {
      await jwt.verify(token, process.env.JWT_KEY)
      const savedArticle = await newArticle.save()
      res.json({ message: savedArticle, code: Config.RESPONSE_CODE.success })
    } catch (err) {
      let mappedError = err.name === Config.JSON_WEB_TOKEN_ERROR ?
        { message: Strings.JWT_SESSION_EXPIRED, code: Config.RESPONSE_CODE.jwtError } :
        { message: err, code: Config.RESPONSE_CODE.error }
      res.send(mappedError)
    }

  }

  /**
   * Get all existing articles
   */
  public getAll = async (_: Request, res: Response) => {

    try {
      const articles = await Article.find()
      res.json({ message: articles, code: Config.RESPONSE_CODE.success })
    } catch (err) {
      res.send({ message: err, code: Config.RESPONSE_CODE.error })
    }

  }

  /**
   * Get an article with the specified ID
   */
  public get = async (req: Request, res: Response) => {

    try {
      const article = await Article.findById(req.params.articleId)
      res.json({ message: article, code: Config.RESPONSE_CODE.success })
    } catch (err) {
      res.send({ message: err, code: Config.RESPONSE_CODE.error })
    }

  }

  /**
   * Find and update an article with the specified ID
   */
  public update = async (req: Request, res: Response) => {

    const updateCondition = { _id: req.params.articleId }
    const article = req.body
    const updateOption = { new: true }
    const token = req.headers.token

    try {
      await jwt.verify(token, process.env.JWT_KEY)
      const edittedArticle = await Article.findOneAndUpdate(updateCondition, article, updateOption)
      res.json({ message: edittedArticle, code: Config.RESPONSE_CODE.success })
    } catch (err) {
      let mappedError = err.name === Config.JSON_WEB_TOKEN_ERROR ?
        { message: Strings.JWT_SESSION_EXPIRED, code: Config.RESPONSE_CODE.jwtError } :
        { message: err, code: Config.RESPONSE_CODE.error }
      res.send(mappedError)
    }

  }

  /**
   * Delete an article with the specified ID
   */
  public delete = async (req: Request, res: Response) => {

    const deleteCondition = { _id: req.params.articleId }
    const token = req.headers.token

    try {
      await jwt.verify(token, process.env.JWT_KEY)
      await Article.remove(deleteCondition)
      res.json({ message: Strings.ARTICLE_SUCCESS_DELETED, code: Config.RESPONSE_CODE.success })
    } catch (err) {
      let mappedError = err.name === Config.JSON_WEB_TOKEN_ERROR ?
        { message: Strings.JWT_SESSION_EXPIRED, code: Config.RESPONSE_CODE.jwtError } :
        { message: err, code: Config.RESPONSE_CODE.error }
      res.send(mappedError)
    }

  }
}
