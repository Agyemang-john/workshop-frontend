// next.config.ts
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  sw: "custom-sw.js",
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  // Any other next config you already have
};

module.exports = withPWA(nextConfig);
// This will enable PWA support in your Next.js app
// and configure it to use the public directory for service worker files.
// You can customize the PWA configuration options as needed.
// For example, you can specify the runtime caching strategies,
// modify the service worker file, etc.