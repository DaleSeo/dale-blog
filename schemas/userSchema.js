const Schema = require('mongoose').Schema

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    set (value) {
      return value.trim().toLowerCase()
    },
    validate: [
      {
        validator (value) {
          return (value.match(/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i) != null)
        },
        message: 'Invalid email'
      }
    ]
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

module.exports = schema
