/**
 * Controller for authentication.
 */
import * as mongoose from 'mongoose'
import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'

import { UserSchema } from '../models/user.model'
import ConfigConstant from 'constants/config'
import StringConstant from 'constants/string'

const User = mongoose.model('User', UserSchema)

export class AuthController {

  /**
   * Handles login request.
   */
  public login = async (req: Request, res: Response) => {

    const { email, password } = req.body

    try {
      const loggedUser = await User.findOne({ email: email })
      if (!loggedUser) {
        res.send({ message: StringConstant.AUTH_FAIL_USER_NOT_FOUND })
      } else {
        loggedUser.validPassword(password, (err, isValid) => {
          if (isValid && !err) {
            const token = jwt.sign({ data: loggedUser }, ConfigConstant.JWT_KEY, { expiresIn: ConfigConstant.JWT_EXPIRY })
            res.json({ message: StringConstant.AUTH_SUCCESS, id: loggedUser.id, token })
          }
          res.send({ message: StringConstant.AUTH_FAIL_INVALID_PASSWORD })
        })
      }
    } catch (err) {
      res.send(err)
    }

  }

  public changePassword = async (req: Request, res: Response) => {

    const { email, password, newPassword } = req.body

    try {
      const currentUser = await User.findOne({ email: email })
      if (!currentUser) {
        res.send({ message: 'User not found' })
      } else {
        currentUser.validPassword(password, async (err, isValid) => {
          if (isValid && !err) {
            currentUser.password = newPassword
            await currentUser.save()
            res.json({ message: 'Password successfully changed!' })
          }
        })
      }
    } catch (err) {
      res.send(err)
    }
  }
}