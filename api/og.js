const FLEXIYO_BASE_URI = "https://fiyodev.vercel.app";
const FIYOSAAVN_API_BASE_URI = "https://fiyosaavn.vercel.app/api";
const FIYOGQL_BASE_URI = "https://fiyogql.onrender.com/graphql";

/**
 * Fetch song metadata from FiyoSaavn API.
 */
async function getMusicMetadata(trackId) {
  try {
    const response = await fetch(`${FIYOSAAVN_API_BASE_URI}/songs/${trackId}`);
    const result = await response.json();

    if (result.data?.length) {
      const songData = result.data[0];
      return {
        title: `${songData.name} - ${songData.artists.primary[0].name}`,
        image: songData.image[1],
        ogType: "music.song",
      };
    }
  } catch (error) {
    console.error("Error fetching song metadata:", error);
  }
  return null;
}

/**
 * Fetch user metadata from Fiyo GraphQL API.
 */
async function getUserMetadata(username) {
  try {
    const response = await fetch(FIYOGQL_BASE_URI, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
          getUser(username: "${username}") {
            status { success }
            user { full_name username avatar }
          }
        }`,
      }),
    });

    const result = await response.json();
    if (result?.data?.getUser?.status.success) {
      const { full_name, username, avatar } = result.data.getUser.user;
      return {
        title: `${full_name} (@${username}) • Flexiyo`,
        image: avatar,
        ogType: "profile",
      };
    }
  } catch (error) {
    console.error("Error fetching user metadata:", error);
  }
  return null;
}

/**
 * Generate Open Graph meta tags as an HTML response.
 */
function generateMetaHtml(metadata, redirectUrl) {
  return `
    <html>
      <head>
        <title>${metadata.title}</title>
        <meta property="og:title" content="${metadata.title}" />
        <meta property="og:image" content="${metadata.image}" />
        <meta property="og:url" content="${redirectUrl}" />
        <meta property="og:type" content="${metadata.ogType}" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body>
        <script>window.location.href = "${redirectUrl}";</script>
      </body>
    </html>
  `;
}

/**
 * Detects if the request is from a bot.
 */
function isBot(userAgent) {
  if (!userAgent) return false;
  return /facebookexternalhit|Twitterbot|WhatsApp|Slackbot|LinkedInBot|Googlebot|Pinterestbot|Discordbot|TelegramBot/i.test(
    userAgent
  );
}

/**
 * API Handler for dynamic Open Graph metadata.
 */
export default async function handler(req, res) {
  try {
    const urlObj = new URL(req.url, FLEXIYO_BASE_URI);
    const path = urlObj.pathname;
    const searchParams = urlObj.searchParams;
    const track = searchParams.get("track");
    const username = searchParams.get("username");
    const userAgent = req.headers["user-agent"] || "";

    let metadata = {
      title: "Flexiyo - Flex in Your Onset",
      image: "https://cdnfiyo.github.io/img/logos/flexiyo.png",
      ogType: "website",
    };

    if (path === "/music" && track) {
      const musicMetadata = await getMusicMetadata(track);
      if (musicMetadata) metadata = musicMetadata;
    } else if (path.startsWith("/u/") && username) {
      const userMetadata = await getUserMetadata(username);
      if (userMetadata) metadata = userMetadata;
    }

    const redirectUrl = `${FLEXIYO_BASE_URI}${path}`;

    if (isBot(userAgent)) {
      res.setHeader("Content-Type", "text/html");
      return res.status(200).send(generateMetaHtml(metadata, redirectUrl));
    }

    return res.redirect(302, redirectUrl);
  } catch (error) {
    console.error("❌ Handler Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export const config = {
  runtime: "edge",
};
