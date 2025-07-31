import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  target: "node20",
  format: ["cjs"],
  bundle: true,
  minify: true,
  sourcemap: false,
  clean: true,
  noExternal: [/./],
});
