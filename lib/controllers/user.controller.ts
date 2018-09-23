/**
 * Controller for user. Handles CRUD operations.
 */

import * as mongoose from 'mongoose'
import * as jwt from 'jsonwebtoken'
import { Request, Response } from 'express'

import { UserSchema } from '../models/user.model'
import Config from '../constants/config'
import Strings from '../constants/string'

const User = mongoose.model('User', UserSchema)

export class UserController {

  /**
   * Add a new user into the database.
   */
  public create = async (req: Request, res: Response) => {

    const newUser = new User(req.body)
    const { email } = req.body

    try {
      const existingUsers = await User.find({ email: email })
      if (existingUsers.length > 0) {
        res.send({ message: Strings.USER_FAIL_ALREADY_EXISTED, code: Config.RESPONSE_CODE.error })
      } else {
        const savedUser = await newUser.save()
        res.json({ message: savedUser, code: Config.RESPONSE_CODE.success })
      }
    } catch (err) {
      res.send({ message: err, code: Config.RESPONSE_CODE.error })
    }

  }

  /**
   * Get all users from the database.
   */
  public getAll = async (req: Request, res: Response) => {

    try {
      const users = await User.find()
      res.json({ message: users, code: Config.RESPONSE_CODE.success })
    } catch (err) {
      res.send({ message: err, code: Config.RESPONSE_CODE.error })
    }

  }

  /**
   * Get a user based on its id.
   */
  public get = async (req: Request, res: Response) => {

    try {
      const user = await User.findById(req.params.userId)
      res.json({ message: user, code: Config.RESPONSE_CODE.success })
    } catch (err) {
      res.send({ message: err, code: Config.RESPONSE_CODE.error })
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
      res.json({ message: edittedUser, code: Config.RESPONSE_CODE.success })
    } catch (err) {
      let mappedError = err.name === Config.JSON_WEB_TOKEN_ERROR ?
        { message: Strings.JWT_SESSION_EXPIRED, code: Config.RESPONSE_CODE.jwtError } :
        { message: err, code: Config.RESPONSE_CODE.error }
      res.send(mappedError)
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
      res.json({ message: Strings.USER_SUCCESS_DELETE, code: Config.RESPONSE_CODE.success })
    } catch (err) {
      res.send({ message: err, code: Config.RESPONSE_CODE.error })
    }

  }
}