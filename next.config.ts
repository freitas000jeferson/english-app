import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	images: {
		domains: ['giphy.com', 'media4.giphy.com', 'media.giphy.com', 'i.giphy.com'],
	},
};

export default nextConfig;
