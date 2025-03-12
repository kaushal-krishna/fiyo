export default async function middleware(req) {
  const url = new URL(req.url);
  const userAgent = req.headers.get("user-agent") || "";

  const botRegex =
    /(facebookexternalhit|Twitterbot|WhatsApp|Slackbot|LinkedInBot|Googlebot|Pinterestbot|Discordbot|TelegramBot|Bingbot|DuckDuckBot|Yahoo! Slurp|YandexBot|Baiduspider|Applebot|Facebot|ia_archiver|AhrefsBot|SemrushBot|DotBot|MJ12bot|PetalBot|SiteAuditBot|SogouSpider|SeznamBot|Mediapartners-Google|Exabot|GPTBot|ClaudeBot|YouBot|Bytespider|CCBot|MetaInspector|Google-Read-Aloud|Google Favicon|Google Web Preview|AdsBot-Google|Yeti|Twitter AdsBot|Google-Safety|Google-Structured-Data-Testing-Tool|Google-Image|ViberBot|SkypeUriPreview|SkypeBot|SnapchatBot)/i;

  if (botRegex.test(userAgent)) {
    const metadata = await fetch(
      `${url.origin}/api/handler${url.pathname}${url.search}`
    )
      .then((res) => res.text())
      .catch(() => null);

    if (metadata) {
      return new Response(metadata, {
        headers: { "Content-Type": "text/html" },
      });
    }
  }

  return new Response(null, { status: 204 });
}

export const config = { matcher: "/:path*" };
