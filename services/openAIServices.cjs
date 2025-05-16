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
const poeticQuotePromptFilePath = path.join(
  __dirname,
  "../prompts/poetryInstaPost.txt"
);

const questionPromptPath = path.join(
  __dirname,
  "../prompts/questionsPrompt.txt"
);

const testPath = path.join(__dirname, "../prompts/test.txt");

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

async function generatePoeticQuote() {
  const fileData = await fs.readFileSync(poeticQuotePromptFilePath, "utf8");

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: `${fileData}` }],
    model: "gpt-4o",
  });

  return completion.choices?.[0].message?.content;
}

async function generateQuestions(baseArticle) {
  const fileData = await fs.readFileSync(questionPromptPath, "utf8");

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: `${fileData} ${baseArticle}` }],
    model: "gpt-3.5-turbo",
  });
  console.log(
    "🚀 ~ generateQuestions ~ completion:",
    completion.choices?.[0].message
  );

  return completion.choices?.[0].message?.content;
}

async function imageGeneration() {
  const prompt =
    "Depict Vibhishana standing in front of a grand palace, with Lord Rama crowning him as the king of Lanka. Vibhishana should be shown in humble, royal attire, bowing respectfully. Highlight the presence of Rama, Lakshmana, and other characters from the Ramayana, celebrating Vibhishana’s righteousness and loyalty.";

  const completion = await openai.images.generate({
    model: "dall-e-3",
    prompt,
    n: 1,
    size: "1024x1024",
  });
  console.log("🚀 ~ imageGeneration ~ completion:", completion);

  return completion.data?.[0].url;
}

module.exports = {
  generateTweet,
  generateArticle,
  generatePoeticQuote,
  imageGeneration,
  generateQuestions,
};

// generatePoeticQuote().then((res) => {
//   console.log(res);
// });

// imageGeneration().then((res) => {
//   console.log(res);
// });

async function randomAIExp() {
  const prompt = "";
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: `${fileData} ${baseArticle}` }],
    model: "gpt-3.5-turbo",
  });

  return completion.choices?.[0].message?.content;
}
