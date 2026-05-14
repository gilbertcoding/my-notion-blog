import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Notion 이미지 및 외부 이미지 호스팅 허용
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.notion.so",
      },
      {
        protocol: "https",
        hostname: "**.notion.site",
      },
      {
        protocol: "https",
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
      },
      // Cloudinary, Imgix 등 외부 이미지 스토리지
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      // 샘플 데이터의 플레이스홀더 이미지
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },
};

export default nextConfig;
