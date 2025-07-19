/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zcumvmfvzgkadgefqwav.supabase.co",
      },
      {
        protocol: "https",
        hostname: "pagedone.io",
        pathname: "/asset/uploads/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/200**",
      },
    ],
  },
};

export default nextConfig;
