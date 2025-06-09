/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        perf_hooks: false,
        os: false,
        path: false,
      };
    }
    return config;
  },
  
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;