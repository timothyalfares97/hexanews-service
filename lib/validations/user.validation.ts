/**
 * Validations for user.
 */
import * as Joi from 'joi'

export default {
  addNewUser: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(20).alphanum().required(),
      name: Joi.string().min(3).max(50).required()
    }
  },

  getUser: {
    params: {
      userId: Joi.string().hex().required()
    }
  },

  updateUser: {
    body: {
      name: Joi.string().min(3).max(50).required()
    }
  },

  deleteUser: {
    params: {
      userId: Joi.string().hex().required()
    }
  }

}