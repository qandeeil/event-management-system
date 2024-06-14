/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    metadataBase: "https://event-management-system.gloryna.com",
  },
  images: {
    domains:
      process.env.NODE_ENV === "development"
        ? ["localhost"]
        : ["backend-event-management-system.gloryna.com"],
  },
};

export default nextConfig;
