/**
 * Controller for user. Handles CRUD operations.
 */

import * as mongoose from 'mongoose'
import * as jwt from 'jsonwebtoken'
import { Request, Response } from 'express'

import { UserSchema } from '../models/user.model'
import Config from '../constants/config'

const User = mongoose.model('User', UserSchema)

export class UserController {

  /**
   * Add a new user into the database.
   */
  public create = async (req: Request, res: Response) => {

    const newUser = new User(req.body)

    try {
      const savedUser = await newUser.save()
      res.json(savedUser)
    } catch (err) {
      res.send(err)
    }

  }

  /**
   * Get all users from the database.
   */
  public getAll = async (req: Request, res: Response) => {

    try {
      const users = await User.find()
      res.json(users)
    } catch (err) {
      res.send(err)
    }

  }

  /**
   * Get a user based on its id.
   */
  public get = async (req: Request, res: Response) => {

    try {
      const user = await User.findById(req.params.userId)
      res.json(user)
    } catch (err) {
      res.send(err)
    }

  }

  /**
   * Find and update a user by its id.
   */
  public update = async (req: Request, res: Response) => {

    const updateCondition = { _id: req.params.userId }
    const user = req.body
    const updateOption = { new: true }
    const token = req.headers.token

    try {
      await jwt.verify(token, Config.JWT_KEY)
      const edittedUser = await User.findOneAndUpdate(updateCondition, user, updateOption)
      res.json({ message: edittedUser, code: 'SUCCESS' })
    } catch (err) {
      res.send({ message: err, code: 'ERROR' })
    }

  }

  /**
   * Delete a user based on its id.
   */
  public delete = async (req: Request, res: Response) => {

    const deleteCondition = { _id: req.params.userId }
    const token = req.headers.token

    try {
      await jwt.verify(token, Config.JWT_KEY)
      await User.remove(deleteCondition)
      res.json({ message: 'user deleted', code: 'SUCCESS' })
    } catch (err) {
      res.send({ message: err, code: 'ERROR' })
    }

  }
}