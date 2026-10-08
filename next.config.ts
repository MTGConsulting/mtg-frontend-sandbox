import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Use the compiler API: CLI output parsing fails in this environment.
    useTypeScriptCli: false,
  },
};

export default nextConfig;
