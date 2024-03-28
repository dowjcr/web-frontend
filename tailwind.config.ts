import { join } from 'path';
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { jcrTheme } from './skeleton.theme';

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			colors: {
				magentah: '#990066',
				primary: {
					50: '#FFEBF8',
					100: '#FFD6F1',
					200: '#FFA8E2',
					300: '#FF80D5',
					400: '#FF57C7',
					500: '#FF29B8',
					600: '#FF00AA',
					700: '#D6008F',
					800: '#A80070',
					900: '#800055',
					950: '#42002C'
				}
			}
		}
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				custom: [jcrTheme]
			}
		})
	]
} satisfies Config;
