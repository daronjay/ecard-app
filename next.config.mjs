/** @type {import('next').NextConfig} */
const nextConfig = {
  // better-sqlite3 is native, don't try to bundle it
  experimental: {
    serverComponentsExternalPackages: ["better-sqlite3"],
  },
};

export default nextConfig;
