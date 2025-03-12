import { NextResponse } from "next/server";

const botRegex =
  /(facebookexternalhit|Twitterbot|WhatsApp|Slackbot|LinkedInBot|Googlebot|Pinterestbot|Discordbot|TelegramBot|Bingbot|DuckDuckBot|Yahoo! Slurp|YandexBot|Baiduspider|Applebot|Facebot|ia_archiver|AhrefsBot|SemrushBot|DotBot|MJ12bot|PetalBot|SiteAuditBot|SogouSpider|SeznamBot|Mediapartners-Google|Exabot|GPTBot|ClaudeBot|YouBot|Bytespider|CCBot|MetaInspector|Pinterestbot|Google-Read-Aloud|Google Favicon|Google Web Preview|AdsBot-Google|Yeti|Twitter AdsBot|Google-Safety|Google-Structured-Data-Testing-Tool|Google-Image|ViberBot|SkypeUriPreview|SkypeBot|SnapchatBot)/i;

export function middleware(req) {
  const userAgent = req.headers.get("user-agent") || "";

  if (botRegex.test(userAgent)) {
    return NextResponse.rewrite(new URL("/api/handler", req.url));
  }

  return NextResponse.rewrite(new URL("/index.html", req.url));
}

export const config = {
  matcher: "/:path*",
};
