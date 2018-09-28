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
   * @property {string} req.body.email user's email
   * @property {string} req.body.password user's password
   * @return authentication token for the user, null if authentication failed
   */
  public login = async (req: Request, res: Response) => {

    const { email, password } = req.body

    try {
      // Check if there is a user based on the login detail
      const loggedUser = await User.findOne({ email: email })
      if (!loggedUser) {
        res.send({ message: Config.ERROR_MESSAGE.userNotFound, code: Config.RESPONSE_CODE.error })
      } else {
        // Check if the user's password matches the password
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
   * @property {string} req.body.email user's email
   * @property {string} req.body.password user's password
   * @property {string} req.body.newPassword user's new password
   * @property {string} req.headers.token user's jwt token
   * @return changed password success key, otherwise the error key
   */
  public changePassword = async (req: Request, res: Response) => {

    const { email, password, newPassword } = req.body
    const token = req.headers.token

    try {
      // Verify jwt token and check if user exists
      await jwt.verify(token, process.env.JWT_KEY)
      const currentUser = await User.findOne({ email: email })
      // Check if there is a user based on the login detail
      if (!currentUser) {
        res.send({ message: Config.ERROR_MESSAGE.userNotFound, code: Config.RESPONSE_CODE.error })
      } else {
        // Check if the current user's password matches the password
        const isValid = await currentUser.validPassword(password)
        if (isValid) {
          // Set the new password
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
   * @property {string} req.body.email user's email
   * @return password reset email sent success key, otherwise the error key
   */
  public resetPassword = async (req: Request, res: Response) => {

    const { email } = req.body

    try {
      // Check if there is a user based on the login detail
      const resettedUser = await User.findOne({ email: email })
      if (!resettedUser) {
        res.send({ message: Config.ERROR_MESSAGE.userNotFound, code: Config.RESPONSE_CODE.error })
      } else {
        // Generate random token and reset the user's password
        const token = randToken.uid(8)
        resettedUser.password = token
        const options = {
          auth: {
            api_key: process.env.SENDGRID_API_KEY
          }
        }

        // Create the mail with specific configuration
        const smtpTransport = nodemailer.createTransport(sgTransport(options))
        const mailOptions = {
          to: resettedUser.email,
          from: Config.EMAIL_CONFIG.from,
          subject: Config.EMAIL_CONFIG.subject,
          text: Config.EMAIL_CONFIG.content(resettedUser.name, token)
        }

        // Send the mail using smtpTransport and then saved the user
        await smtpTransport.sendMail(mailOptions)
        await resettedUser.save()
        res.json({ message: Config.SUCCESS_MESSAGE.resetPasswordSuccess, code: Config.RESPONSE_CODE.success })
      }
    } catch (err) {
      res.send({ message: err, code: Config.RESPONSE_CODE.error })
    }
  }
}
