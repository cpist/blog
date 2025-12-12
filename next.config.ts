import type { NextConfig } from "next";

const repo = "blog"; // ← GitHub 레포 이름으로 바꾸기

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true, // GH Pages에서 폴더 라우팅 안정적
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
  images: { unoptimized: true }, // next/image 최적화 서버가 없으므로
};

export default nextConfig;
