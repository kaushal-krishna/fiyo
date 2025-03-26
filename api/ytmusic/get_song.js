export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { id, contentQuality } = req.query;
  if (!id) return res.status(400).json({ error: "Missing video ID" });

  try {
    let qualityIndex = 0;
    switch (contentQuality) {
      case "low":
        qualityIndex = 4;
        break;
      case "normal":
        qualityIndex = 1;
        break;
      default:
        qualityIndex = 0;
    }

    const checkResponse = await fetch("https://cnvmp3.com/check_database.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        youtube_id: id,
        quality: qualityIndex,
        formatValue: 1,
      }),
    });

    const checkData = await checkResponse.json();

    if (checkData.success) {
      res.status(200).json({
        id,
        name: checkData.data.title,
        artists: [],
        playsCount: 0,
        image: checkData.data.thumbnail,
        link: checkData.data.server_path,
      });
      return;
    }

    const downloadResponse = await fetch(
      "https://cnvmp3.com/download_video_ucep.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: `https://www.youtube.com/watch?v=${id}`,
          quality: qualityIndex,
          formatValue: 1,
          title: checkData.data.title,
        }),
      }
    );

    const downloadData = await downloadResponse.json();

    if (!downloadData.success) {
      console.error(`Failed to download MP3 for ${checkData.data.title}`);
      return res.status(500).json({ error: "Failed to download MP3" });
    }

    const link = downloadData.download_link;

    await fetch("https://cnvmp3.com/insert_to_database.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        server_path: link,
        formatValue: 1,
        quality: qualityIndex,
        title: checkData.data.title,
        youtube_id: id,
      }),
    });

    res.status(200).json({
      id,
      link,
    });
  } catch (error) {
    console.error("YT Music Get Song API error:", error);
    res.status(500).json({ error: error.message });
  }
}
