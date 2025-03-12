const FLEXIYO_BASE_URI = "https://fiyodev.vercel.app";
const FIYOSAAVN_API_BASE_URI = "https://fiyosaavn.vercel.app/api";
const FIYOGQL_BASE_URI = "https://fiyogql.onrender.com/graphql";

/** Detects if the request is from a bot */
const isBot = (userAgent) =>
  /bot|crawler|spider|crawling|archiver|facebookexternalhit|Twitterbot|WhatsApp|Slackbot|LinkedInBot|Googlebot|Pinterestbot|Discordbot|TelegramBot|Bingbot|Yahoo! Slurp|DuckDuckBot|Baiduspider|YandexBot|Sogou|Exabot|facebot|ia_archiver/i.test(
    userAgent || ""
  );

/** Fetches song metadata */
const getMusicMetadata = async (trackId) => {
  try {
    const res = await fetch(`${FIYOSAAVN_API_BASE_URI}/songs/${trackId}`);
    const data = await res.json();
    const song = data?.data?.[0];
    return song
      ? {
          title: `${song.name} • Flexiyo`,
          description: `
            • Artists: ${song.artists.primary
              .map((artist) => artist.name)
              .join(", ")}\n
            • Album: ${song.album.name}`,
          image: song.image[1].url,
          ogType: "music.song",
        }
      : null;
  } catch {
    return null;
  }
};

/** Fetches user metadata */
const getUserMetadata = async (username) => {
  try {
    const res = await fetch(FIYOGQL_BASE_URI, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{ 
          getUser(username: "${username}") { 
            status { 
              success 
            } 
            user { 
              full_name 
              username 
              avatar 
              posts_count 
              followers_count 
              following_count 
            }
          } 
        }`,
      }),
    });
    const user = res.ok ? (await res.json())?.data?.getUser?.user : null;
    return user
      ? {
          title: `${user.full_name} (@${user.username}) • Flexiyo`,
          description: `
            • ${user.posts_count} Posts\n
            • ${user.followers_count} Followers\n
            • ${user.following_count} Following\n
            `,
          image: user.avatar,
          ogType: "profile",
        }
      : null;
  } catch {
    return null;
  }
};

/** Generates Open Graph HTML */
const generateMetaHtml = (
  { title, description, image, ogType },
  redirectUrl
) => `
  <html>
    <head>
      <title>${title}</title>
      <meta property="og:title" content="${title}" />
      <meta property="og:description" content="${description}" />
      <meta property="og:image" content="${image}" />
      <meta property="og:url" content="${redirectUrl}" />
      <meta property="og:type" content="${ogType}" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="${title}" />
      <meta name="twitter:description" content="${description}" />
      <meta name="twitter:image" content="${image}" />
      <meta name="twitter:url" content="${redirectUrl}" />
      <meta name="twitter:type" content="${ogType}" />
    </head>
  </html>
`;

/** API Handler (Only for Bots) */
export default async function handler(req) {
  if (!isBot(req.headers.get("user-agent")))
    return new Response(null, { status: 404 });

  const url = new URL(req.url);
  const path = url.pathname;
  const track = url.searchParams.get("track");
  const username = path.startsWith("/u/") ? path.split("/")[2] : null;
  const redirectUrl = `${FLEXIYO_BASE_URI}${path}`;

  let metadata = {
    title: "Flexiyo - Flex in Your Onset",
    image: "https://cdnfiyo.github.io/img/logos/flexiyo.png",
    ogType: "website",
  };

  if (path === "/music" && track)
    metadata = (await getMusicMetadata(track)) || metadata;
  if (path.startsWith("/u/") && username)
    metadata = (await getUserMetadata(username)) || metadata;

  return new Response(generateMetaHtml(metadata, redirectUrl), {
    headers: { "Content-Type": "text/html" },
  });
}

export const config = { runtime: "edge" };
