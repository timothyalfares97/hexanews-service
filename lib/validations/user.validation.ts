/**
 * Validates inputs for user server methods
 */

import * as Joi from 'joi'

export default {
  create: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(20).alphanum().required(),
      name: Joi.string().min(3).max(50).required(),
      description: Joi.string().max(100).allow('')
    }
  },

  get: {
    params: {
      userId: Joi.string().hex().required()
    }
  },

  update: {
    body: {
      name: Joi.string().min(3).max(50).required(),
      description: Joi.string().max(100).allow('')
    }
  },

  delete: {
    params: {
      userId: Joi.string().hex().required()
    }
  }

}