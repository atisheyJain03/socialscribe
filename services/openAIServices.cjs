require("dotenv").config();
const OpenAI = require("openai");

const path = require("path");

const fs = require("fs");

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const tweetPromptFilePath = path.join(__dirname, "../prompts/tweetPrompt.txt");
const articlePromptFilePath = path.join(
  __dirname,
  "../prompts/articlePrompt.txt"
);

async function generateTweet(baseArticle) {
  const fileData = await fs.readFileSync(tweetPromptFilePath, "utf8");

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: `${fileData} ${baseArticle}` }],
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0].message?.content;
}

async function generateArticle(baseArticle) {
  const fileData = await fs.readFileSync(articlePromptFilePath, "utf8");

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: `${fileData} ${baseArticle}` }],
    model: "gpt-3.5-turbo",
  });

  return completion.choices?.[0].message?.content;
}

module.exports = { generateTweet, generateArticle };

// generateArticle(
//   "https://yourstory.com/2024/06/capital-is-no-substitute-for-revenue-says-tv-mohandas-pai-byju-edtech"
// );
