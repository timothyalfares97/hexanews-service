/**
 * A collection of server methods to handle authentication
 */

import * as mongoose from 'mongoose'
import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import * as nodemailer from 'nodemailer'
import * as sgTransport from 'nodemailer-sendgrid-transport'
import * as randToken from 'rand-token'

import { UserSchema } from '../models/user.model'
import Config from '../constants/config'

const User = mongoose.model('User', UserSchema)

export class AuthController {

  /**
   * Authenticate user and provide an authentication token
   */
  public login = async (req: Request, res: Response) => {

    const { email, password } = req.body

    try {
      const loggedUser = await User.findOne({ email: email })
      if (!loggedUser) {
        res.send({ message: Config.ERROR_MESSAGE.userNotFound, code: Config.RESPONSE_CODE.error })
      } else {
        const isValid = await loggedUser.validPassword(password)
        if (isValid) {
          const token = jwt.sign({ data: loggedUser }, process.env.JWT_KEY, { expiresIn: Config.JWT_EXPIRY })
          res.json({ message: Config.SUCCESS_MESSAGE.authSuccess, id: loggedUser.id, token, code: Config.RESPONSE_CODE.success })
        } else {
          res.send({ message: Config.ERROR_MESSAGE.invalidPassword, code: Config.RESPONSE_CODE.error })
        }
      }
    } catch (err) {
      res.send({ message: err, code: Config.RESPONSE_CODE.error })
    }

  }

  /**
   * Change a user's password
   */
  public changePassword = async (req: Request, res: Response) => {

    const { email, password, newPassword } = req.body
    const token = req.headers.token

    try {
      await jwt.verify(token, process.env.JWT_KEY)
      const currentUser = await User.findOne({ email: email })
      if (!currentUser) {
        res.send({ message: Config.ERROR_MESSAGE.userNotFound, code: Config.RESPONSE_CODE.error })
      } else {
        const isValid = await currentUser.validPassword(password)
        if (isValid) {
          currentUser.password = newPassword
          await currentUser.save()
          res.json({ message: Config.SUCCESS_MESSAGE.changePasswordSuccess, code: Config.RESPONSE_CODE.success })
        } else {
          res.send({ message: Config.ERROR_MESSAGE.invalidPassword, code: Config.RESPONSE_CODE.error })
        }
      }
    } catch (err) {
      let mappedError = err.name === Config.JSON_WEB_TOKEN_ERROR ?
        { message: Config.ERROR_MESSAGE.sessionExpired, code: Config.RESPONSE_CODE.jwtError } :
        { message: err, code: Config.RESPONSE_CODE.error }
      res.send(mappedError)
    }
  }

  /**
   * Reset a user's password and send the user a password reset email
   */
  public resetPassword = async (req: Request, res: Response) => {

    const { email } = req.body

    try {
      const resettedUser = await User.findOne({ email: email })
      if (!resettedUser) {
        res.send({ message: Config.ERROR_MESSAGE.userNotFound, code: Config.RESPONSE_CODE.error })
      } else {
        const token = randToken.uid(8)
        resettedUser.password = token
        const options = {
          auth: {
            api_key: process.env.SENDGRID_API_KEY
          }
        }
        const smtpTransport = nodemailer.createTransport(sgTransport(options))
        const mailOptions = {
          to: resettedUser.email,
          from: Config.EMAIL_CONFIG.from,
          subject: Config.EMAIL_CONFIG.subject,
          text: Config.EMAIL_CONFIG.content(resettedUser.name, token)
        }

        await smtpTransport.sendMail(mailOptions)
        await resettedUser.save()
        res.json({ message: Config.SUCCESS_MESSAGE.resetPasswordSuccess, code: Config.RESPONSE_CODE.success })
      }
    } catch (err) {
      res.send({ message: err, code: Config.RESPONSE_CODE.error })
    }
  }
}
