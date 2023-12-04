/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:['res.cloudinary.com']
  },
  publicRuntimeConfig: {
		BASE_API: process.env.BASE_API,
	},
}

module.exports = nextConfig
