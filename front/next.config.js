/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: [`${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.APP_AWS_REGION}.amazonaws.com`]
  },
}

module.exports = nextConfig