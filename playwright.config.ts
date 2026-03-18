import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './',
  testMatch: ['**/TC*.spec.ts'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1, // ← Add 1 retry - handles flaky Cloudflare issues
  workers: process.env.CI ? 1 : 2, // ← Reduce from 4 to 2 workers
  reporter: [['html', { port: 9324, open: 'never' }]],
  use: {
    baseURL: 'https://parabank.parasoft.com',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    // Bot bypass
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    extraHTTPHeaders: {
      'Accept-Language': 'en-US,en;q=0.9',
    },
    launchOptions: {
      args: [
        '--disable-blink-features=AutomationControlled',
        '--disable-web-security',
        '--no-sandbox'
      ]
    }
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});