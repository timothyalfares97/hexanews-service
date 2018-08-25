import * as mongoose from 'mongoose'
import { Request, Response } from 'express'

import { UserSchema } from '../models/user.model'

const User = mongoose.model('User', UserSchema)

export class AuthController {

  public login = async (req: Request, res: Response) => {

    const { email, password } = req.body

    try {
      const loggedUser = await User.findOne({ email: email })
      if (!loggedUser) {
        res.send({ message: 'Authentication failed. There is no user found.' })
      } else {
        res.send({ message: 'Authentication successful' })
      }
    } catch (err) {
      res.send(err)
    }

  }
}