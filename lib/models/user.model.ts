/**
 * Model for user with its attributes and types
 */

import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'

import Config from '../constants/config'

const Schema = mongoose.Schema
const saltFactor = 10

/**
 * Specify the attributes and types of user
 */
export const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
})

/**
 * Hash the user's password before it is saved to the database
 */
UserSchema.pre(Config.SAVE, async function () {

  if (this.isModified(Config.PASSWORD)) {
    const salt = await bcrypt.genSalt(saltFactor)
    const hash = await bcrypt.hash(this.password, salt)
    this.password = hash
  }

})

/**
 * Verify if the given password matches the user's password
 */
UserSchema.methods.validPassword = async function (password) {

  try {
    const isValid = await bcrypt.compare(password, this.password)
    return isValid
  } catch (err) {
    return err
  }

}

/**
 * Convert user object to JSON and delete password attribute to secure the data send back to client side
 */
UserSchema.methods.toJSON = function() {

  const obj = this.toObject()
  delete obj.password
  return obj

}