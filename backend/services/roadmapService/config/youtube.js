import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

const serviceVideo = async (topic) => {
  try {
    const query = `CodeHelp by Babbar ${topic}`;

    let { data } = await axios.get(BASE_URL, {
      params: {
        key: process.env.YOUTUBE_API_KEY,
        part: "snippet",
        q: query,
        maxResults: 5,
        type: "video",
      },
    })

    let video = data.items?.find((item) =>
      item.snippet.channelTitle.toLowerCase().includes("virtual code")
    )

    if (!video) {
      const { data: fallbackData } = await axios.get(BASE_URL, {
        params: {
          key: process.env.YOUTUBE_API_KEY,
          part: "snippet",
          q: `${topic} Tutorial`,
          maxResults: 1,
          type: "video",
        },
      })

      video = fallbackData.items?.[0];
    }

    if (!video) {
      return null;
    }

    return {
      title: video.snippet.title,
      channel: video.snippet.channelTitle,
      url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
    }
  } catch (error) {
    console.error(
      "YouTube video error:",
      error.response?.data || error.message
    );
    return null;
  }
}

export default serviceVideo;
