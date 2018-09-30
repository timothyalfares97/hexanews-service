/**
 * A collection of server methods to handle articles
 */

import * as mongoose from 'mongoose'
import * as jwt from 'jsonwebtoken'
import { Request, Response } from 'express'

import { ArticleSchema } from '../models/article.model'
import Config from '../constants/config'

const Article = mongoose.model('Article', ArticleSchema)

export class ArticleController {

  /**
   * Create a new article
   * @property {Article} req.body article properties
   * @property {string} req.headers.token user's jwt token
   * @return the saved article if success, otherwise the error key
   */
  public create = async (req: Request, res: Response) => {

    const newArticle = new Article(req.body)
    const token = req.headers.token

    try {
      await jwt.verify(token, process.env.JWT_KEY)
      const savedArticle = await newArticle.save()
      res.json({ message: savedArticle, code: Config.RESPONSE_CODE.success })
    } catch (err) {
      let mappedError = err.name === Config.JSON_WEB_TOKEN_ERROR || err.name === Config.TOKEN_EXPIRED_ERROR ?
        { message: Config.ERROR_MESSAGE.sessionExpired, code: Config.RESPONSE_CODE.jwtError } :
        { message: err, code: Config.RESPONSE_CODE.error }
      res.send(mappedError)
    }

  }

  /**
   * Get all existing articles
   * @return a collection of all existing articles
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
   * @param articleId ID of the article
   * @return article with the specified ID
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
   * @param articleId ID of the article to be updated
   * @property {Article} req.body article properties
   * @property {string} req.headers.token user's jwt token
   * @return the editted article if success, otherwise the error key
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
      let mappedError = err.name === Config.JSON_WEB_TOKEN_ERROR || err.name === Config.TOKEN_EXPIRED_ERROR ?
        { message: Config.ERROR_MESSAGE.sessionExpired, code: Config.RESPONSE_CODE.jwtError } :
        { message: err, code: Config.RESPONSE_CODE.error }
      res.send(mappedError)
    }

  }

  /**
   * Delete an article with the specified ID
   * @param articleId ID of the article to be deleted
   * @property {string} req.headers.token user's jwt token
   * @return article deleted success key, otherwise the error key
   */
  public delete = async (req: Request, res: Response) => {

    const deleteCondition = { _id: req.params.articleId }
    const token = req.headers.token

    try {
      await jwt.verify(token, process.env.JWT_KEY)
      await Article.remove(deleteCondition)
      res.json({ message: Config.SUCCESS_MESSAGE.articleDeletedSuccess, code: Config.RESPONSE_CODE.success })
    } catch (err) {
      let mappedError = err.name === Config.JSON_WEB_TOKEN_ERROR || err.name === Config.TOKEN_EXPIRED_ERROR ?
        { message: Config.ERROR_MESSAGE.sessionExpired, code: Config.RESPONSE_CODE.jwtError } :
        { message: err, code: Config.RESPONSE_CODE.error }
      res.send(mappedError)
    }

  }
}
