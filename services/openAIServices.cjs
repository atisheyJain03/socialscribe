require("dotenv").config();
const OpenAI = require("openai");

const path = require("path");

const fs = require("fs");

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const tweetPromptFilePath = path.join(__dirname, "../prompts/tweetPrompt.txt");

async function generateTweet(baseArticle) {
  const fileData = await fs.readFileSync(tweetPromptFilePath, "utf8");

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: `${fileData} ${baseArticle}` }],
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0].message;
}

module.exports = { generateTweet };
