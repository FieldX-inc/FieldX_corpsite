/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/what-we-do",
        destination: "/service",
        permanent: true
      },
      {
        source: "/what-we-do/:path*",
        destination: "/service/:path*",
        permanent: true
      },
      {
        source: "/column",
        destination: "/column/magazine",
        permanent: false
      }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io"
      }
    ]
  }
};

export default nextConfig;
