import { defineConfig } from "tsup";

export default defineConfig({
  tsconfig: "./tsconfig.build.json",
  entry: {
    rust: "src/rust/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  outDir: "dist/lib",
  outExtension({ format }) {
    return {
      js: format === "esm" ? ".mjs" : ".cjs"
    };
  },
});
