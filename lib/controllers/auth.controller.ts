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
import Strings from '../constants/string'

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
        res.send({ message: Strings.AUTH_FAIL_USER_NOT_FOUND, code: Config.RESPONSE_CODE.error })
      } else {
        const isValid = await loggedUser.validPassword(password)
        if (isValid) {
          const token = jwt.sign({ data: loggedUser }, Config.JWT_KEY, { expiresIn: Config.JWT_EXPIRY })
          res.json({ message: Strings.AUTH_SUCCESS, id: loggedUser.id, token, code: Config.RESPONSE_CODE.success })
        } else {
          res.send({ message: Strings.AUTH_FAIL_INVALID_PASSWORD, code: Config.RESPONSE_CODE.error })
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
      await jwt.verify(token, Config.JWT_KEY)
      const currentUser = await User.findOne({ email: email })
      if (!currentUser) {
        res.send({ message: Strings.AUTH_USER_NOT_FOUND, code: Config.RESPONSE_CODE.error })
      } else {
        const isValid = await currentUser.validPassword(password)
        if (isValid) {
          currentUser.password = newPassword
          await currentUser.save()
          res.json({ message: Strings.AUTH_SUCCESS_CHANGE_PASSWORD, code: Config.RESPONSE_CODE.success })
        } else {
          res.send({ message: Strings.AUTH_CURRENT_PASSWORD_WRONG, code: Config.RESPONSE_CODE.error })
        }
      }
    } catch (err) {
      let mappedError = err.name === Config.JSON_WEB_TOKEN_ERROR ?
        { message: Strings.JWT_SESSION_EXPIRED, code: Config.RESPONSE_CODE.jwtError } :
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
        res.send({ message: Strings.AUTH_USER_NOT_FOUND, code: Config.RESPONSE_CODE.error })
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
          from: 'admin@hexanews.com',
          subject: 'Hexanews Password Reset',
          text: `Hi ${resettedUser.name}, \n\n
            You are receiving this email because you (or someone else) have requested to reset the password of your account. \n\n
            Your new password is: ${token} \n\n
            Please login and change your password immediately. \n\n
            Regards, \n\n
            Hexanews Team`
        }

        await smtpTransport.sendMail(mailOptions)
        await resettedUser.save()
        res.json({ message: Strings.AUTH_SUCCESS_RESET_PASSWORD, code: Config.RESPONSE_CODE.success })
      }
    } catch (err) {
      res.send({ message: err, code: Config.RESPONSE_CODE.error })
    }
  }
}
