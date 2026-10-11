import type { APIRoute } from 'astro';

// Built from `site` in astro.config.mjs, so the sitemap URL follows the production domain.
export const GET: APIRoute = ({ site }) =>
  new Response(
    `User-agent: *
Allow: /

Sitemap: ${new URL('sitemap-index.xml', site).href}
`,
    {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    },
  );
