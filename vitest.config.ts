import { defineConfig } from "vitest/config";
import packageJson from "./package.json";

export default defineConfig({
  test: {
    watch: false,
    globals: true,
    include: ["**/*.test.ts"],
    coverage: {
      provider: "v8",
      reportsDirectory: `dist/site/coverage/v${packageJson.version}`,
      clean: true,
      exclude: ["**/index.ts", "**/.vitepress"]
    },
  },
});
