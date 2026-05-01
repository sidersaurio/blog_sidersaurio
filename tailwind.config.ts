import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  // Gummies uses data-theme attribute toggling, not the .dark class strategy
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Atkinson', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        gm: '1.25rem',
        'gm-sm': '0.75rem',
        'gm-xs': '0.5rem',
      },
      boxShadow: {
        gm: '0 2px 0 0 var(--gm-shadow), 0 4px 16px 0 oklch(0% 0 0 / 12%)',
        'gm-hover': '0 4px 0 0 var(--gm-shadow), 0 8px 24px 0 oklch(0% 0 0 / 16%)',
      },
      colors: {
        gm: {
          bg: 'var(--gm-bg)',
          surface: 'var(--gm-surface)',
          border: 'var(--gm-border)',
          text: 'var(--gm-text)',
          muted: 'var(--gm-muted)',
          accent: 'var(--gm-accent)',
          'accent-hover': 'var(--gm-accent-hover)',
          coral: 'var(--gm-coral)',
          amber: 'var(--gm-amber)',
          mint: 'var(--gm-mint)',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
