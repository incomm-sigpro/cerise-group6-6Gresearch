import { defineConfig } from "vitest/config";
import path from "path";
import TestSequence from "./vitest/testSequencerVite";

export default defineConfig({
  test: {
    environment: "node",
    root: "./",
    include: ["./src/**/?(*.)+(spec|test).[jt]s?(x)"],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
    ],
    globals: true,
    globalSetup: ["./vitest/globalSetupVite.ts"],
    setupFiles: [
      // path.resolve(__dirname, "src", "tests", "mocks", "vitest.mock.ts"),
      // path.resolve(__dirname, "src", "tests"),
    ],
    unstubEnvs: false,
    singleThread: true,
    testTimeout: 10000,
    sequence: {
      sequencer: TestSequence as any,
    },
    hookTimeout: 60 * 1000,
    logHeapUsage: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
