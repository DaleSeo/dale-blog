require('dotenv').config()

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/blog',
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME || 'dale-blog',
  AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION || 'ap-northeast-2',
  appTitle: 'Dale\'s Blog',
  sessionOptions: {
    secret: 'b1117062-b1ca-43b8-ac25-1095a34cd293',
    resave: true,
    saveUninitialized: true
  }
}
