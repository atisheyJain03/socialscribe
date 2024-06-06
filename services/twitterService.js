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
async function postTextTweet(tweetText) {
  const response = await twitterRwClient.v2.tweet(tweetText);

  return response;
}

// postTweet();

module.exports = { postTextTweet };
