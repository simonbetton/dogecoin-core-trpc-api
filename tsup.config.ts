import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts", "src/client/index.ts", "src/server/index.ts"],
	outDir: "dist",
	target: "node20",
	format: ["cjs", "esm"],
	bundle: true,
	minify: true,
	sourcemap: false,
	clean: true,
	dts: true,
	noExternal: [/./],
});
