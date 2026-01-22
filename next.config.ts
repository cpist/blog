import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const repo = "blog";

const nextConfig: NextConfig = {
    // 1. 설정 유지
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
    output: "export",
    trailingSlash: true,
    basePath: `/${repo}`,
    assetPrefix: `/${repo}/`,
    images: { unoptimized: true },
};

// 2. 옵션(plugins) 부분 삭제! 
// (페이지 컴포넌트인 PostPage에서 직접 처리하므로 여기선 필요 없습니다)
const withMDX = createMDX({
    // options: { ... }  <-- 이 부분이 에러의 원인이었으므로 삭제합니다.
});

export default withMDX(nextConfig);