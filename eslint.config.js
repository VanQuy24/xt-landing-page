import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

export default [
  { ignores: ['dist/', '.astro/', 'node_modules/', '.claude/', '.agents/', '_bmad/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    // Standalone design board script, runs in the browser.
    files: ['design-system/xiontechs/preview/**/*.js'],
    languageOptions: {
      globals: Object.fromEntries(
        [
          'document',
          'matchMedia',
          'innerWidth',
          'devicePixelRatio',
          'requestAnimationFrame',
          'IntersectionObserver',
          'Path2D',
          'ResizeObserver',
        ].map((g) => [g, 'readonly']),
      ),
    },
  },
];
