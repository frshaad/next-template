import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  typedRoutes: true,
  experimental: {
    viewTransition: true,
    turbopackFileSystemCacheForDev: true,
    typedEnv: true,
  },
};

export default nextConfig;
