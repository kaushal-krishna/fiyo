import { useContext } from "react";
import axios from "axios";
import AppContext from "../context/items/AppContext.jsx";
import { fiyosaavnApiBaseUri } from "../constants.js";

const useMusicUtils = ({
  currentTrack,
  setCurrentTrack,
  setIsAudioPlaying,
  setIsAudioLoading,
  previouslyPlayedTracks,
  setPreviouslyPlayedTracks,
}) => {
  const { contentQuality, connectedToInternet } = useContext(AppContext);

  const getSearchSuggestions = async (term) => {
    try {
      const { data } = await axios.post(
        "https://music.youtube.com/youtubei/v1/music/get_search_suggestions",
        {
          input: term,
          context: {
            client: {
              clientName: "WEB_REMIX",
              clientVersion: "1.2025011",
            },
          },
        },
      );

      delete data?.responseContext;
      delete data?.trackingParams;
      delete data?.contents[1];

      const suggestions = [];

      const suggestionContents =
        data?.contents[0]?.searchSuggestionsSectionRenderer?.contents;

      suggestionContents?.map((content) => {
        const suggestionText =
          content?.searchSuggestionRenderer?.suggestion?.runs;
        const suggestionQuery =
          content?.searchSuggestionRenderer?.navigationEndpoint?.searchEndpoint
            ?.query;

        suggestions.push({ suggestionText, suggestionQuery });
      });

      return suggestions;
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Fetch track data from API
  const getTrackData = async (trackId) => {
    try {
      const { data } = await axios.get(
        `${fiyosaavnApiBaseUri}/songs/${trackId}`,
      );
      const resultData = data.data[0];

      if (!resultData) console.error("Error fetching track data");

      const getQualityIndex = (quality, low, normal, high) =>
        quality === "low" ? low : quality === "normal" ? normal : high;

      const trackData = {
        id: resultData.id,
        name: resultData.name,
        album: resultData.album.name,
        artists: resultData.artists.primary
          .map((artist) => artist.name)
          .join(", "),
        image: resultData.image[getQualityIndex(contentQuality, 0, 1, 2)]?.url,
        link: resultData.downloadUrl[getQualityIndex(contentQuality, 0, 3, 4)]
          ?.url,
        lyrics: null,
      };
      return trackData;
    } catch (error) {
      console.error(`Error fetching track data: ${error}`);
    }
  };

  // Cache track data in localStorage
  const cacheTrackData = async (trackData) => {
    try {
      const trackKey = `t_${trackData.id}`;
      const existingData = localStorage.getItem(trackKey);

      if (existingData) {
        const parsedData = JSON.parse(existingData);
        const updatedData = {
          ...parsedData,
          ...Object.fromEntries(
            Object.entries(trackData).filter(([key, value]) => value !== null),
          ),
        };
        localStorage.setItem(trackKey, JSON.stringify(updatedData));
      } else {
        localStorage.setItem(trackKey, JSON.stringify(trackData));
      }
    } catch (error) {
      console.error(`Error in cacheTrackData: ${error}`);
    }
  };

  // Get Track (web version without file download)
  const getTrack = async (trackId) => {
    setIsAudioLoading(true);
    try {
      const cachedTrack = localStorage.getItem(`t_${trackId}`);
      if (cachedTrack) {
        const parsedTrack = JSON.parse(cachedTrack);
        // For web, we use the link directly instead of checking file existence
        setCurrentTrack({ ...parsedTrack, path: parsedTrack.link });
        return;
      }

      const fetchedTrackData = await getTrackData(trackId);
      if (!fetchedTrackData) return console.error("Error fetching track data");

      // On web, we use the streaming URL directly instead of downloading
      fetchedTrackData.path = fetchedTrackData.link;

      await cacheTrackData(fetchedTrackData);
      setCurrentTrack(fetchedTrackData);
      setPreviouslyPlayedTracks((prevTracks) => [...prevTracks, trackId]);
    } catch (error) {
      console.error(`Error in getTrack: ${error}`);
    } finally {
      setIsAudioLoading(false);
    }
  };

  // Fetch track lyrics
  const getTrackLyrics = async (trackData) => {
    try {
      const fetchLyrics = async () => {
        try {
          const { data } = await axios.get(
            `https://lyrist.vercel.app/api/${trackData.name}/${trackData.artists
              ?.split(",")[0]
              .trim()}`,
          );
          if (data?.lyrics) return data;
          console.error("Lyrist API failed to fetch lyrics");
        } catch (error) {
          const { data } = await axios.get(
            `${fiyosaavnApiBaseUri}/songs/${trackData.id}/lyrics`,
          );
          return data.data;
        }
      };

      const lyricsData = await fetchLyrics();
      const lyrics = lyricsData?.lyrics || "Couldn't load lyrics.";

      cacheTrackData({ id: trackData.id, lyrics });
      setCurrentTrack((prev) => ({ ...prev, lyrics }));
      return lyrics;
    } catch (error) {
      setCurrentTrack((prev) => ({ ...prev, lyrics: null }));
      console.error(`Error getTrackLyrics: ${error}`);
    }
  };

  // Get tracks from localStorage
  const getTracksFromDB = async () => {
    try {
      const dbTracks = Object.keys(localStorage)
        .filter((key) => key.startsWith("t_"))
        .map((key) => JSON.parse(localStorage.getItem(key)));
      return dbTracks || [];
    } catch (error) {
      console.error(`Error getTracksFromDB: ${error}`);
    }
  };

  // Get suggested track ID
  const getSuggestedTrackId = async () => {
    try {
      const suggestedTrackIds = !connectedToInternet
        ? (await getTracksFromDB()).map((track) => track.id)
        : (
            await axios.get(
              `${fiyosaavnApiBaseUri}/songs/${currentTrack.id}/suggestions`,
              { params: { limit: 5 } },
            )
          ).data.data.map((item) => item.id);

      const availableTracks = suggestedTrackIds.filter(
        (id) => !previouslyPlayedTracks.includes(id),
      );

      if (availableTracks.length === 0) {
        console.error("No suggested tracks available.");
        return null;
      }

      return availableTracks[
        Math.floor(Math.random() * availableTracks.length)
      ];
    } catch (error) {
      console.error(`Error getSuggestedTrackId: ${error}`);
    }
  };

  // Audio playback controls (adjusted for web, assuming MusicContext provides handlers)
  const handleAudioPlay = async () => {
    setIsAudioPlaying(true);
    // Handled by MusicContext's audioRef in web version
  };

  const handleAudioPause = async () => {
    setIsAudioPlaying(false);
    // Handled by MusicContext's audioRef in web version
  };

  const handleNextAudioTrack = async () => {
    try {
      const nextTrackId = await getSuggestedTrackId();
      await getTrack(nextTrackId);
    } catch (error) {
      console.error(`Error handleNextTrack: ${error}`);
    }
  };

  return {
    getSearchSuggestions,
    getTrackData,
    cacheTrackData,
    getTrack,
    getTrackLyrics,
    getTracksFromDB,
    getSuggestedTrackId,
    handleAudioPlay,
    handleAudioPause,
    handleNextAudioTrack,
  };
};

export default useMusicUtils;
