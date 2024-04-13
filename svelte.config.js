import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import * as child_process from 'node:child_process';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess()],

	vitePlugin: {
		inspector: true
	},
	kit: {
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		// version: {
			// https://kit.svelte.dev/docs/configuration#version
		//	name: child_process.execSync('git rev-parse HEAD').toString().trim(),
		//	pollInterval: 10 * 1000
		//}
	}
};

process.on('unhandledRejection', (reason, promise) => {
	console.error('Unhandled Rejection at: Promise', promise, 'reason:', reason);
});

export default config;
