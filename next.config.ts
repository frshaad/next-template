import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    authInterrupts: true,
  },
  logging: {
    browserToTerminal: 'error',
    fetches: { fullUrl: true },
  },
  reactCompiler: true,
  typedRoutes: true,
};

export default nextConfig;
