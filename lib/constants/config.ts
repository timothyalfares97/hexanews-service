/**
 * All constants variable that related to configuration
 */

const JWT_KEY = 'superSecret'
const JWT_EXPIRY = '2 days'
const SAVE = 'save'
const PASSWORD = 'password'
const MAX_VIEWS = 10000
const JSON_WEB_TOKEN_ERROR = 'JsonWebTokenError'
const JSON_LIMIT = '5mb'
const PORT_NUMBER = 4000
const EXPRESS_LISTENING = 'Express server listening on port '

// Config for all email related
const EMAIL_CONFIG = {
  from: 'admin@hexanews.com',
  subject: 'Hexanews Password Reset',
  content: (name: string, token: string) => {
    return `Hi ${name}, \n\n
    You are receiving this email because you (or someone else) have requested to reset the password of your account. \n\n
    Your new password is: ${token} \n\n
    Please login and change your password immediately. \n\n
    Regards, \n\n
    Hexanews Team`
  }
}

// Config for all endpoint paths
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

// Config for all response code
const RESPONSE_CODE = {
  success: 'SUCCESS',
  jwtError: 'JWTERROR',
  error: 'ERROR'
}

export default {
  PORT_NUMBER,
  JWT_KEY,
  JWT_EXPIRY,
  JSON_WEB_TOKEN_ERROR,
  EXPRESS_LISTENING,
  SAVE,
  JSON_LIMIT,
  PASSWORD,
  MAX_VIEWS,
  ENDPOINT,
  RESPONSE_CODE,
  EMAIL_CONFIG
}