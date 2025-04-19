/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Optimized for self-hosting
  eslint: {
    ignoreDuringBuilds: false, // Enable ESLint checking during build
    dirs: ['app', 'components', 'lib', 'utils'], // Directories to lint
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        fs: false,
        dns: false,
        child_process: false,
      };
    }
    return config;
  },
  // Manually set environment variables
  env: {
    MYSQL_HOST: 'localhost',
    MYSQL_PORT: '3306',
    MYSQL_USER: 'root',
    MYSQL_PASSWORD: 'Qwerty777$$$',
    MYSQL_DATABASE: 'project_bolt',
    NEXT_AUTH_SECRET: 'mysecretkey'
  }
};

module.exports = nextConfig;
