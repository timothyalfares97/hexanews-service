import * as mongoose from 'mongoose'
import { Request, Response } from 'express'

import { UserSchema } from '../models/user.model'

const User = mongoose.model('User', UserSchema)

export class UserController {

  public addNewUser = async (req: Request, res: Response) => {

    const newUser = new User(req.body)

    try {
      const savedUser = await newUser.save()
      res.json(savedUser)
    } catch (err) {
      res.send(err)
    }

  }

  public getUser = async (req: Request, res: Response) => {

    try {
      const user = await User.findById(req.params.userId)
      res.json(user)
    } catch (err) {
      res.send(err)
    }

  }

  public updateUser = async (req: Request, res: Response) => {

    const updateCondition = { _id: req.params.userId }
    const user = req.body
    const updateOption = { new: true }

    try {
      const edittedUser = await User.findOneAndUpdate(updateCondition, user, updateOption)
      res.json(edittedUser)
    } catch (err) {
      res.send(err)
    }

  }

  public deleteUser = async (req: Request, res: Response) => {

    const deleteCondition = { _id: req.params.userId }
    try {
      const deletedUser = await User.remove(deleteCondition)
      res.json(deletedUser)
    } catch (err) {
      res.send(err)
    }

  }
}