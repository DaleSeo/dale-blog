const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(config.MONGODB_URI)
