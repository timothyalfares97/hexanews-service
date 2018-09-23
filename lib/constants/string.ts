/**
 * All constants variable that related to user messages
 */

const AUTH_SUCCESS = 'Authentication successful.'
const AUTH_FAIL_INVALID_PASSWORD = 'Authentication failed. Invalid password.'
const AUTH_FAIL_USER_NOT_FOUND = 'Authentication failed. There is no user found.'
const AUTH_USER_NOT_FOUND = 'User is not found'
const AUTH_CURRENT_PASSWORD_WRONG = 'Current password is wrong'
const AUTH_SUCCESS_CHANGE_PASSWORD = 'Password has been successfully changed!'

const USER_FAIL_ALREADY_EXISTED = 'Email is already existed, use another email'
const USER_SUCCESS_DELETE = 'User has been deleted'

const ARTICLE_SUCCESS_DELETED = 'Article has been deleted'

const JWT_SESSION_EXPIRED = 'Session expired, please re-login'

export default {
  AUTH_SUCCESS,
  AUTH_FAIL_INVALID_PASSWORD,
  AUTH_FAIL_USER_NOT_FOUND,
  AUTH_USER_NOT_FOUND,
  AUTH_CURRENT_PASSWORD_WRONG,
  AUTH_SUCCESS_CHANGE_PASSWORD,
  ARTICLE_SUCCESS_DELETED,
  USER_FAIL_ALREADY_EXISTED,
  USER_SUCCESS_DELETE,
  JWT_SESSION_EXPIRED
}