/// <reference types="@cloudflare/workers-types" />

/**
 * @type {import('@cloudflare/workers-types').ExportedHandler}
 */
const worker = {
  async fetch(request, env, _ctx) {
    const latestVersion = "v2";
    const url = new URL(request.url);
    const redirects = new Map([
      ["/", `/${latestVersion}/docs/`],
      ["/index.html", `/${latestVersion}/docs/`],
      ["/docs", `/${latestVersion}/docs/`],
      ["/docs/", `/${latestVersion}/docs/`],
      ["/sitemap.xml", `/${latestVersion}/docs/sitemap.xml`],
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
