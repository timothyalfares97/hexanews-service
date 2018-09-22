/**
 * Controller for authentication.
 */

import * as mongoose from 'mongoose'
import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import * as nodemailer from 'nodemailer'
import * as sgTransport from 'nodemailer-sendgrid-transport'
import * as randToken from 'rand-token'

import { UserSchema } from '../models/user.model'
import Config from '../constants/config'
import Strings from '../constants/string'

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
        res.send({ message: Strings.AUTH_FAIL_USER_NOT_FOUND, code: 'ERROR' })
      } else {
        const isValid = await loggedUser.validPassword(password)
        if (isValid) {
          const token = jwt.sign({ data: loggedUser }, Config.JWT_KEY, { expiresIn: Config.JWT_EXPIRY })
          res.json({ message: Strings.AUTH_SUCCESS, id: loggedUser.id, token, code: 'SUCCESS' })
        } else {
          res.send({ message: Strings.AUTH_FAIL_INVALID_PASSWORD, code: 'ERROR' })
        }
      }
    } catch (err) {
      res.send({ message: err, code: 'ERROR' })
    }

  }

  public changePassword = async (req: Request, res: Response) => {

    const { email, password, newPassword } = req.body
    const token = req.headers.token

    try {
      await jwt.verify(token, Config.JWT_KEY)
      const currentUser = await User.findOne({ email: email })
      if (!currentUser) {
        res.send({ message: 'User is not found', code: 'ERROR' })
      } else {
        const isValid = await currentUser.validPassword(password)
        if (isValid) {
          currentUser.password = newPassword
          await currentUser.save()
          res.json({ message: 'Password successfully changed!', code: 'SUCCESS' })
        } else {
          res.send({ message: 'Current password is wrong', code: 'ERROR' })
        }
      }
    } catch (err) {
      let mappedError = err.name === 'JsonWebTokenError' ?
        { message: 'Session expired, please relogin', code: 'JWTERROR' } :
        { message: err, code: 'ERROR' }
      res.send(mappedError)
    }
  }

  public resetPassword = async (req: Request, res: Response) => {

    const { email } = req.body

    try {
      const resettedUser = await User.findOne({ email: email })
      const token = randToken.uid(8)
      const options = {
        auth: {
          api_key: ''
        }
      }
      const smtpTransport = nodemailer.createTransport(sgTransport(options))
      const mailOptions = {
        to: email,
        from: 'hexanews@admin.com',
        subject: 'Hexanews Password Reset',
        text: `hi ${resettedUser.name}, \n\n
        You are receiving this because you (or someone else) have requested the reset of the password for your account.
        Your new password is ${token}, please change your password immediately.
        `
      }

      await smtpTransport.sendMail(mailOptions)
      await resettedUser.save()
      res.json({ message: 'Password has successfully resetted' })
    } catch (err) {
      res.send(err)
    }
  }
}
