/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		typedRoutes: true,
		serverActions: true,
	},
	images: {
		domains: ["media.graphassets.com"],
	},
	async redirects() {
		return [
			{
				source: "/products",
				destination: "/products/1",
				permanent: true,
			},
			{
				source: "/categories/:categorySlug",
				destination: "/categories/:categorySlug/1",
				permanent: true,
			},
			{
				source: "/collections/:collectionSlug",
				destination: "/collections/:collectionSlug/1",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
