import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3030",
    trace: "on-first-retry",
    channel: "chrome",
    headless: true,
  },
  projects: [
    {
      name: "chromium",
      use: {
        channel: "chrome",
      },
    },
  ],
});
