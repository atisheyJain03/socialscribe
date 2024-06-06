require("dotenv").config();
const axios = require("axios");

/**
 * Retrieves details from an article URL using the Diffbot API.
 * @param {string} articleLink - The URL of the article for which details are to be retrieved.
 * @returns {Promise<void>} - A Promise that resolves once the article details are fetched and logged to the console.
 */
async function getArticleDetails(articleLink) {
  const options = {
    headers: {
      accept: "application/json", // Request content type
    },
  };

  try {
    // Construct API request URL with provided article link and Diffbot API token
    const link = `https://api.diffbot.com/v3/article?url=${articleLink}&token=${process.env.DIFFBOT_TOKEN}`;

    const response = await axios.get(link, options);

    // Log the extracted article text to the console
    // console.log(response.data?.objects?.[0]?.text);

    return response.data?.objects?.[0]?.text;
  } catch (error) {
    // Log any errors that occur during the request
    console.error(error);
    throw new Error("Someting wend wrong with diffbot");
  }
}

// Example usage:
// const articleLink =
//   "https://yourstory.com/2024/05/battery-recycling-startups-ev-sustainability";
// getArticleDetails(articleLink);

// Export the function for use in other modules
module.exports = { getArticleDetails };
