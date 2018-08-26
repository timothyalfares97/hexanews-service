import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'

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
    required: true
  },
  name: {
    type: String,
  },
  created_date: {
    type: Date,
    default: Date.now,
    required: true
  }
})

UserSchema.pre('save', async function(next) {

  const user = this
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(saltFactor)
      const hash = await bcrypt.hash(user.password, salt)
      user.password = hash
      next()
    } catch (err) {
      return next(err)
    }
  } else {
    return next()
  }

})

UserSchema.methods.validPassword = async function(password, callback) {

  try {
    const isValid = await bcrypt.compare(password, this.password)
    callback(null, isValid)
  } catch (err) {
    return callback(err)
  }

}