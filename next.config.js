/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["ht-api.canfianceesthetique", "img.youtube.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.ht-api.canfianceesthetique.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        port: "137",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },

      {
        protocol: "https",
        hostname: "i3.ytimg.com",
      },
    ],
  },
  redirects: async () => [
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'www.yourdomain.com' }],
      destination: 'https://yourdomain.com/:path*',
      permanent: true
    }
  ]
};

module.exports = nextConfig;
