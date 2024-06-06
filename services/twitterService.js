require("dotenv").config();
const { TwitterApi } = require("twitter-api-v2");

// Your Twitter API credentials from the .env file
const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_KEY_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  bearerToken: process.env.TWITTER_BEARER_TOKEN,
});

const twitterRwClient = client.readWrite;

// Post a tweet
async function postTweet(tweetText) {
  try {
    const response = await twitterRwClient.v2.tweet(tweetText);
    console.log("Tweet posted successfully:", response);
  } catch (error) {
    console.error("Error posting tweet:", error);
  }
}

// postTweet();

module.exports = { postTweet };
