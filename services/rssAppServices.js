const { default: axios } = require("axios");
const { StartupNewsWorkflow } = require("../workflows/startupNewsWorkflow");

const fetchRssData = async (url) => {
  try {
    const response = await axios.get(url);

    const data = response?.data?.items ?? [];

    return data;
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
  }
};

async function runFetchedRssData() {
  const data = await fetchRssData(
    "https://rss.app/feeds/v1.1/_pOFO6pApzPEXRwrQ.json"
  );

  for (let i = 0; i < data.length; i++) {
    const workFlow = new StartupNewsWorkflow(data[i].url);
    await workFlow.triggerWorkflow();
  }
}

module.exports = { runFetchedRssData };
