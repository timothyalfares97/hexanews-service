/**
 * Schema model for user.
 */

import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'

import Config from '../constants/config'

const Schema = mongoose.Schema
const saltFactor = 10

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

UserSchema.pre(Config.SAVE, async function () {

  if (this.isModified(Config.PASSWORD)) {
    const salt = await bcrypt.genSalt(saltFactor)
    const hash = await bcrypt.hash(this.password, salt)
    this.password = hash
  }

})

UserSchema.methods.validPassword = async function (password) {

  try {
    const isValid = await bcrypt.compare(password, this.password)
    return isValid
  } catch (err) {
    return err
  }

}

UserSchema.methods.toJSON = function() {

  const obj = this.toObject()
  delete obj.password
  return obj

}