import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  typedRoutes: true,
  experimental: {
    authInterrupts: true,
  },
};

export default nextConfig;
