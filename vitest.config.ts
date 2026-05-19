import { defineConfig } from "vitest/config";
import packageJson from "./package.json";
import { buildVersion, parse } from "./src/.utils/version";

export default defineConfig({
  test: {
    watch: false,
    globals: true,
    include: ["**/*.test.ts"],
    coverage: {
      provider: "v8",
      reportsDirectory: `dist/site/${buildVersion(parse(buildVersion(packageJson.version)).major)}/coverage`,
      clean: false,
      exclude: ["**/index.ts", "**/.vitepress"]
    },
  },
});
