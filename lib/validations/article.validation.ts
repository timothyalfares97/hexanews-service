/**
 * Validations for article.
 */
import * as Joi from 'joi'

export default {
  addNewArticle: {
    body: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      author: Joi.string().required(),
      category: Joi.string().required()
    }
  },

  getArticle: {
    params: {
      articleId: Joi.string().hex().required()
    }
  },

  updateArticle: {
    params: {
      articleId: Joi.string().hex().required()
    },

    body: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      author: Joi.string().required(),
      category: Joi.string().required()
    }
  },

  deleteArticle: {
    params: {
      articleId: Joi.string().hex().required()
    }
  }

}