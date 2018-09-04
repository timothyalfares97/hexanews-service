/**
 * Validations for authentication.
 */

import * as Joi from 'joi'

export default {
  login: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  },

  changePassword: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(20).alphanum().required()
    }
  },

  resetPassword: {
    body: {
      email: Joi.string().email().required()
    }
  }

}