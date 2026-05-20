/// <reference types="@cloudflare/workers-types" />

/**
 * @type {import('@cloudflare/workers-types').ExportedHandler}
 */
const worker = {
  async fetch(request, env, _ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/" || url.pathname === "/index.html") {
      return Response.redirect(`${url.origin}/v1/docs`, 308);
    }

    if (url.pathname === "/sitemap.xml") {
      return Response.redirect(`${url.origin}/v1/docs/sitemap.xml`, 308);
    }

    return await env.ASSETS.fetch(request);
  },
};

export default worker;
