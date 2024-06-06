const { default: axios } = require("axios");

const fetchRssData = async (url) => {
  try {
    const response = await axios.get(url);
    console.log("🚀 ~ fetchRssData ~ response:", response?.data?.items);
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
  }
};

fetchRssData("https://rss.app/feeds/v1.1/_pOFO6pApzPEXRwrQ.json");
