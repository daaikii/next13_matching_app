/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [`${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.APP_AWS_REGION}.amazonaws.com`]
  },
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 800,
      aggregateTimeout: 300,
    }
    return config
    },
}