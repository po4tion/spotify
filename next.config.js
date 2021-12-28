/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		domains: [
			'links.papareact.com',
			'i.scdn.co',
			'mosaic.scdn.co',
			'seed-mix-image.spotifycdn.com',
		],
		formats: ['image/avif', 'image/webp'],
	},
};
