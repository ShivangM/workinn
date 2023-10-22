/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'source.unsplash.com',
      'firebasestorage.googleapis.com',
      'lh3.googleusercontent.com',
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
