/// <reference types="@cloudflare/workers-types" />

/**
 * @type {import('@cloudflare/workers-types').ExportedHandler}
 */
const worker = {
  async fetch(request, env, _ctx) {
    const url = new URL(request.url);
    const redirects = new Map([
      ["/", "/v1/docs/"],
      ["/index.html", "/v1/docs/"],
      ["/docs", "/v1/docs/"],
      ["/docs/", "/v1/docs/"],
      ["/sitemap.xml", "/v1/docs/sitemap.xml"],
    ]);

    const redirectTarget = redirects.get(url.pathname);

    if (redirectTarget) {
      return Response.redirect(`${url.origin}${redirectTarget}`, 308);
    }

    const response = await env.ASSETS.fetch(request);

    if (url.pathname.includes("/coverage/")) {
      const headers = new Headers(response.headers);

      headers.set("X-Robots-Tag", "noindex, nofollow");

      return new Response(response.body, {
        headers,
        status: response.status,
        statusText: response.statusText,
      });
    }

    return response;
  },
};

export default worker;
