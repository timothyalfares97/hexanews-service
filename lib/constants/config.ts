/**
 * All constants variable that related to configuration
 */

const JWT_EXPIRY = '2 days'
const SAVE = 'save'
const PASSWORD = 'password'
const MAX_VIEWS = 10000
const JSON_WEB_TOKEN_ERROR = 'JsonWebTokenError'
const TOKEN_EXPIRED_ERROR = 'TokenExpiredError'
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

// Config for all error message code
const ERROR_MESSAGE = {
  invalidPassword: 'INVALID_PASSWORD',
  userNotFound: 'USER_NOT_FOUND',
  userExisted: 'USER_EXISTED',
  sessionExpired: 'SESSION_EXPIRED'
}

// Config for all success message code
const SUCCESS_MESSAGE = {
  authSuccess: 'AUTH_SUCCESS',
  changePasswordSuccess: 'CHANGE_PASSWORD_SUCCESS',
  resetPasswordSuccess: 'RESET_PASSWORD_SUCCESS',
  userDeletedSuccess: 'USER_DELETE_SUCCESS',
  articleDeletedSuccess: 'ARTICLE_DELETE_SUCCESS'
}

export default {
  EMAIL_CONFIG,
  ENDPOINT,
  ERROR_MESSAGE,
  EXPRESS_LISTENING,
  JSON_LIMIT,
  JSON_WEB_TOKEN_ERROR,
  TOKEN_EXPIRED_ERROR,
  JWT_EXPIRY,
  MAX_VIEWS,
  PASSWORD,
  PORT_NUMBER,
  RESPONSE_CODE,
  SAVE,
  SUCCESS_MESSAGE
}