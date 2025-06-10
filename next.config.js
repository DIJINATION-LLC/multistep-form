/** @type {import('next').NextConfig} */
// const nextConfig = {};
// module.exports = {
//   experimental: {
//     serverActions: true,
//   },
//   async redirects() {
//     return []
//   },
// }

// export default nextConfig;

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  async redirects() {
    return []
  },
};

module.exports = nextConfig;

