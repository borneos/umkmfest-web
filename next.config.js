module.exports = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
	},
	publicRuntimeConfig: {
		API: process.env.BASE_API,
		BASE_ENV: process.env.BASE_ENV,
		BASE_HOST: process.env.BASE_HOST,
		TOKENB: process.env.TOKENB,
		BUILDG: process.env.BUILDG
	},
	swcMinify: true,
};
