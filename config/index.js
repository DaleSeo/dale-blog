require('dotenv').config()

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/blog',
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME || 'dale-blog',
  AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION || 'ap-northeast-2',
}
