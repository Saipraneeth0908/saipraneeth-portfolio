import type { NextConfig } from "next";

const basePath = process.env.GITHUB_ACTIONS === "true" ? "/saipraneeth-portfolio" : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : "",
  env: {
    // Exposed so plain <a href> links to public/ assets resolve under basePath.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
