/** @type {import('next').NextConfig} */

import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  // Core Configuration
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@schengen/ui', '@schengen/calculator'],
  },
  
  // Turbo configuration (new format)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // Transpile internal monorepo packages
  transpilePackages: ['@schengen/ui', '@schengen/calculator', '@schengen/payments'],

  // Performance Optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Image Optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // PWA Configuration
  async rewrites() {
    return [
      {
        source: '/sw.js',
        destination: '/_next/static/sw.js',
      },
    ];
  },

  // Security Headers (Enterprise-grade)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self'",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'"
            ].join('; '),
          },
          {
            key: 'Permissions-Policy',
            value: [
              'camera=(), microphone=(), geolocation=()',
              'payment=(self), usb=(), autoplay=()',
              'encrypted-media=(), fullscreen=(self)'
            ].join(', '),
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },

  // Environment Variables Configuration
  env: {
    NEXT_PUBLIC_APP_NAME: 'ETIAS Calculator',
    NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version || '2.0.0',
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },

  // Output Configuration for Vercel
  output: 'standalone',
  
  // Error Handling
  async redirects() {
    return [
      {
        source: '/app/:path*',
        destination: '/:path*',
        permanent: true,
      },
    ];
  },

  // Webpack Configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Bundle Analysis
    if (process.env.ANALYZE === 'true') {
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.ANALYZE': JSON.stringify(true),
        })
      );
    }

    // Fix for jsPDF and related packages
    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false,
      encoding: false,
      fs: false,
      path: false,
      stream: false,
      util: false,
      zlib: false,
    };

    // Optimization for monorepo
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': './src',
      '@/components': './src/components',
      '@/lib': './src/lib',
      '@/styles': './src/styles',
    };

    // Performance optimizations
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20,
          },
          // Common chunk
          common: {
            minChunks: 2,
            chunks: 'all',
            enforce: true,
            priority: 10,
          },
          // Schengen packages chunk
          schengen: {
            name: 'schengen',
            chunks: 'all',
            test: /@schengen/,
            priority: 30,
          },
        },
      };
    }

    return config;
  },

  // TypeScript Configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint Configuration
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['src'],
  },

  // Logging
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },

  // Serverless Function Configuration
  serverRuntimeConfig: {
    maxDuration: 60,
  },

  // Public Runtime Configuration
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
  },
};

export default withBundleAnalyzer(nextConfig);