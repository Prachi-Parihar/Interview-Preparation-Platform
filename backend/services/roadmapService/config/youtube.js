import "dotenv/config";
import axios from "axios";

const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

const searchVideo = async (topic) => {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      console.error(
        "YouTube API key is missing. Check YOUTUBE_API_KEY in your .env file."
      );
      return null;
    }

    // Search for a tutorial related to the module.
    const { data } = await axios.get(BASE_URL, {
      params: {
        key: apiKey,
        part: "snippet",
        q: `${topic} tutorial CodeHelp by Babbar`,
        maxResults: 5,
        type: "video",
      },
    });

    let video = data.items?.[0];

    // Fallback search if the first search returns no videos.
    if (!video) {
      const { data: fallbackData } = await axios.get(BASE_URL, {
        params: {
          key: apiKey,
          part: "snippet",
          q: `${topic} tutorial`,
          maxResults: 1,
          type: "video",
        },
      });

      video = fallbackData.items?.[0];
    }

    if (!video?.id?.videoId) {
      console.log(`No YouTube video found for: ${topic}`);
      return null;
    }

    return {
      title: video.snippet.title,
      channel: video.snippet.channelTitle,
      url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
    };
  } catch (error) {
    console.error(
      "YouTube video error:",
      error.response?.data?.error?.message || error.message
    );

    return null;
  }
};

export default searchVideo;