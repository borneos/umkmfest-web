/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:['res.cloudinary.com']
  },
  publicRuntimeConfig: {
		BASE_API: process.env.BASE_API,
    BASE_TOKEN: process.env.BASE_TOKEN,
    BASE_URL: process.env.BASE_URL,
    BASE_URL_SSO: process.env.BASE_URL_SSO,
	},
}

module.exports = nextConfig
