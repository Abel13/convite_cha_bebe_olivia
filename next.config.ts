/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "izhyyyqldoidmoarugso.supabase.co",
        port: "",
        pathname: "/storage/v1/object/sign/party/**",
      },
    ],
  },
};

export default nextConfig;
