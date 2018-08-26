import * as mongoose from 'mongoose'
import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'

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
        loggedUser.validPassword(password, (err, isValid) => {
          if (isValid && !err) {
            const token = jwt.sign({ data: loggedUser }, 'superSecret', { expiresIn: '2 days' })
            res.json({ message: 'Authentication successful.', id: loggedUser.id, token })
          }
          res.send({ message: 'Authentication failed. Invalid password.' })
        })
      }
    } catch (err) {
      res.send(err)
    }

  }
}