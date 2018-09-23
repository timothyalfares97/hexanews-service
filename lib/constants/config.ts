/**
 * All constants variable that related to configuration
 */

const JWT_KEY = 'superSecret'
const JWT_EXPIRY = '2 days'
const SAVE = 'save'
const PASSWORD = 'password'
const MAX_VIEWS = 10000
const JSON_WEB_TOKEN_ERROR = 'JsonWebTokenError'

const ENDPOINT = {
  articles: '/articles',
  article: '/articles/:articleId',
  categories: '/categories',
  login: '/auth/login',
  changePassword: '/auth/changePassword',
  resetPassword: '/auth/resetPassword',
  users: '/users',
  user: '/users/:userId'
}

const RESPONSE_CODE = {
  success: 'SUCCESS',
  jwtError: 'JWTERROR',
  error: 'ERROR'
}

export default {
  JWT_KEY,
  JWT_EXPIRY,
  JSON_WEB_TOKEN_ERROR,
  SAVE,
  PASSWORD,
  MAX_VIEWS,
  ENDPOINT,
  RESPONSE_CODE
}