/**
 * Validations for article.
 */

import * as Joi from 'joi'

export default {
  create: {
    body: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      authorId: Joi.string().required(),
      category: Joi.string().required()
    }
  },

  get: {
    params: {
      articleId: Joi.string().hex().required()
    }
  },

  update: {
    params: {
      articleId: Joi.string().hex().required()
    },

    body: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      authorId: Joi.string().required(),
      category: Joi.string().required()
    }
  },

  delete: {
    params: {
      articleId: Joi.string().hex().required()
    }
  }

}