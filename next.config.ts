import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  typedRoutes: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    viewTransition: true,
    webVitalsAttribution: ['CLS', 'LCP', 'INP'],
    turbopackFileSystemCacheForDev: true,
    typedEnv: true,
  },
};

export default nextConfig;
