import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run dev -- --port 1234',
		port: 1234
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	use: {
		// Base URL to use in actions like `await page.goto('/')`.
		baseURL: 'http://localhost:1234/',

		// Collect trace when retrying the failed test.
		trace: 'on-first-retry'
	},
	// Run all tests in parallel.
	fullyParallel: true,
	// Fail the build on CI if you accidentally left test.only in the source code.
	forbidOnly: !!process.env.CI,
	// Retry on CI only.
	retries: process.env.CI ? 2 : 0,
	// Opt out of parallel tests on CI.
	workers: process.env.CI ? 1 : undefined
};

export default config;
