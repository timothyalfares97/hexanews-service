import * as mongoose from 'mongoose'
import { Request, Response } from 'express'

import { ArticleSchema } from '../models/article.model'

const Article = mongoose.model('Article', ArticleSchema)

export class ArticleController {

  public addNewArticle = async (req: Request, res: Response) => {

    const newArticle = new Article(req.body)

    try {
      const savedArticle = await newArticle.save()
      res.json(savedArticle)
    } catch (err) {
      res.send(err)
    }

  }

  public getArticles = async (req: Request, res: Response) => {

    try {
      const articles = await Article.find()
      res.json(articles)
    } catch (err) {
      res.send(err)
    }

  }

  public getArticle = async (req: Request, res: Response) => {

    try {
      const article = await Article.findById(req.params.articleId)
      res.json(article)
    } catch (err) {
      res.send(err)
    }

  }

  public updateArticle = async (req: Request, res: Response) => {

    const updateCondition = { _id: req.params.articleId }
    const article = req.body
    const updateOption = { new: true }

    try {
      const edittedArticle = await Article.findOneAndUpdate(updateCondition, article, updateOption)
      res.json(edittedArticle)
    } catch (err) {
      res.send(err)
    }

  }

  public deleteArticle = async (req: Request, res: Response) => {

    const deleteCondition = { _id: req.params.articleId }
    try {
      const deletedArticle = await Article.remove(deleteCondition)
      res.json(deletedArticle)
    } catch (err) {
      res.send(err)
    }

  }
}
