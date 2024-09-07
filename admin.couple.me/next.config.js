/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "i.ibb.co", "ibb.co", "localhost"], // Added localhost
    remotePatterns: [
        {
            protocol: 'https',
            hostname: '**',
            port: '',
            pathname: '**',
        },
    ],
  },
  api: {
    bodyParser: false,
    experimental: {
      runtime: 'edge',
    },
  },
};

module.exports = nextConfig;
