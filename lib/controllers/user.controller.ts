/**
 * A collection of server methods to handle users.
 */

import * as mongoose from 'mongoose'
import * as jwt from 'jsonwebtoken'
import { Request, Response } from 'express'

import { UserSchema } from '../models/user.model'
import Config from '../constants/config'

const User = mongoose.model('User', UserSchema)

export class UserController {

  /**
   * Create a new user
   * @property {User} req.body user properties
   * @property {string} req.body.email user's email
   * @return the new user if success, otherwise the error key
   */
  public create = async (req: Request, res: Response) => {

    const newUser = new User(req.body)
    const { email } = req.body

    try {
      // Check if email is already used for existing users
      const existingUsers = await User.find({ email: email })
      if (existingUsers.length > 0) {
        res.send({ message: Config.ERROR_MESSAGE.userExisted, code: Config.RESPONSE_CODE.error })
      } else {
        const savedUser = await newUser.save()
        res.json({ message: savedUser, code: Config.RESPONSE_CODE.success })
      }
    } catch (err) {
      res.send({ message: err, code: Config.RESPONSE_CODE.error })
    }

  }

  /**
   * Get all existing users
   * @return a collection of all existing users
   */
  public getAll = async (_: Request, res: Response) => {

    try {
      const users = await User.find()
      res.json({ message: users, code: Config.RESPONSE_CODE.success })
    } catch (err) {
      res.send({ message: err, code: Config.RESPONSE_CODE.error })
    }

  }

  /**
   * Get a user with the specified ID
   * @param userId ID of the user
   * @return user with the specified ID
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
   * Find and update a user with the specified ID
   * @param userId ID of the user to be updated
   * @property {User} req.body user properties
   * @property {string} req.headers.token user's jwt token
   * @return the editted user if success, otherwise the error key
   */
  public update = async (req: Request, res: Response) => {

    const updateCondition = { _id: req.params.userId }
    const user = req.body
    const updateOption = { new: true }
    const token = req.headers.token

    try {
      await jwt.verify(token, process.env.JWT_KEY)
      const edittedUser = await User.findOneAndUpdate(updateCondition, user, updateOption)
      res.json({ message: edittedUser, code: Config.RESPONSE_CODE.success })
    } catch (err) {
      let mappedError = err.name === Config.JSON_WEB_TOKEN_ERROR || err.name === Config.TOKEN_EXPIRED_ERROR ?
        { message: Config.ERROR_MESSAGE.sessionExpired, code: Config.RESPONSE_CODE.jwtError } :
        { message: err, code: Config.RESPONSE_CODE.error }
      res.send(mappedError)
    }

  }

  /**
   * Delete a user with the specified ID
   * @param userId ID of the user to be deleted
   * @property {string} req.headers.token user's jwt token
   * @return user deleted success key, otherwise the error key
   */
  public delete = async (req: Request, res: Response) => {

    const deleteCondition = { _id: req.params.userId }
    const token = req.headers.token

    try {
      await jwt.verify(token, process.env.JWT_KEY)
      await User.remove(deleteCondition)
      res.json({ message: Config.SUCCESS_MESSAGE.userDeletedSuccess, code: Config.RESPONSE_CODE.success })
    } catch (err) {
      let mappedError = err.name === Config.JSON_WEB_TOKEN_ERROR || err.name === Config.TOKEN_EXPIRED_ERROR ?
        { message: Config.ERROR_MESSAGE.sessionExpired, code: Config.RESPONSE_CODE.jwtError } :
        { message: err, code: Config.RESPONSE_CODE.error }
      res.send(mappedError)
    }

  }
}