import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		sveltekit(),
		VitePWA({
			registerType: 'autoUpdate',
			devOptions: { enabled: true },
			workbox: {
				globPatterns: ['**/*.{js,css,html}']
			}
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
