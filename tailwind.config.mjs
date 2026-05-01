/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: ['class', '[data-theme="dark"]'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'Courier New', 'monospace'],
			},
			colors: {
				'dark-bg': '#0f1419',
				'dark-surface': '#1a1f2e',
				'dark-hover': '#252d3d',
				'light-bg': '#fafbfc',
				'light-surface': '#ffffff',
				'accent-purple': '#7c3aed',
				'accent-blue': '#3b82f6',
				'accent-neon': '#00ff88',
			},
			backgroundImage: {
				'gradient-accent': 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
				'gradient-neon': 'linear-gradient(135deg, #7c3aed 0%, #00ff88 100%)',
			},
		},
	},
	plugins: [],
};
