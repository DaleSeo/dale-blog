const Schema = require('mongoose').Schema

const schema = new Schema({
  title: {
    type: String,
    required: true,
    validate: [
      {
        validator (value) {
          return value.length <= 120
        },
        message: 'Title is too long (120 max)'
      }
    ]
  },
  text: String,
  published: {
    type: Boolean,
    default: false
  },
  slug: {
    type: String,
    set (value) {
      return value.toLowerCase().replace(' ', '-')
    }
  }
}, { timestamps: true })

schema.query.byPublished = function (published) {
  return this.find({published: published})
}

schema.statics.list = function (query, callback) {
  return this.find(query, null, {sort: {_id: -1}}, callback)
}

module.exports = schema
