const { default: axios } = require("axios");
const { getArticleDetails } = require("../services/diffbotServices");
const {
  generateArticle,
  generateTweet,
} = require("../services/openAIServices.cjs");
const { trimTextWithHashtags, repairJson } = require("../helper/utils");
const { postTextTweet } = require("../services/twitterService");

class StartupNewsWorkflow {
  #error;
  #scrappedArticle;
  #generatedTweet;
  #generatedArticle;
  #articleUrl;
  constructor(newsUrl) {
    this.newsUrl = newsUrl;
    this.#error = null;
    this.#scrappedArticle = "";
    this.#generatedArticle = "";
    this.#generatedTweet = "";
    this.#articleUrl = "";
  }

  async scrapArticle() {
    if (this.#error) {
      return this;
    }
    try {
      const scrappedArticle = await getArticleDetails(this.newsUrl);
      this.#scrappedArticle = scrappedArticle;

      console.log("Article scrapped successfully");
    } catch (error) {
      this.#error = error;
    }
    return this;
  }

  async generateArticle() {
    if (this.#error) {
      return this;
    }
    try {
      const response = await generateArticle(this.#scrappedArticle);
      this.#generatedArticle = response;

      console.log("Article generated successfully ");
    } catch (error) {
      this.#error = error;
    }
    return this;
  }

  async generateTweet() {
    if (this.#error) {
      return this;
    }
    try {
      const response = await generateTweet(this.#scrappedArticle);
      this.#generatedTweet = response;
      console.log("Tweet generated successfully " + response);
    } catch (error) {
      this.#error = error;
    }
    return this;
  }

  async postArticle() {
    if (this.#error) {
      return this;
    }
    try {
      const jsonData = repairJson(this.#generatedArticle);

      const res = await axios.post(
        "https://trend-trails.web.app/api/articles/cat1",
        JSON.parse(jsonData)
      );
      this.#articleUrl = res.data.url;

      console.log("Article Posted successfully " + res.data.url);
    } catch (error) {
      this.#error = error;
    }
    return this;
  }

  async postTweet() {
    if (this.#error) {
      return this;
    }

    try {
      const trimmedText = trimTextWithHashtags(this.#generatedTweet);
      const tweetText = `${trimmedText} \n \n ${this.#articleUrl}`;
      const res = await postTextTweet(tweetText);

      console.log("Tweet Posted successfully" + JSON.stringify(res));

      return this;
    } catch (error) {
      this.#error = error;
    }
  }

  async triggerWorkflow() {
    await this.scrapArticle();
    await Promise.all([this.generateTweet(), this.generateArticle()]);
    await this.postArticle();
    await this.postTweet();

    console.log({
      //   t: this.#generatedTweet,
      //   a: this.#generatedArticle,
      e: this.#error,
    });
  }
}

module.exports = { StartupNewsWorkflow };

// const flow = new StartupNewsWorkflow(
//   "https://yourstory.com/2024/06/capital-is-no-substitute-for-revenue-says-tv-mohandas-pai-byju-edtech"
// );

// flow.triggerWorkflow();

// IIFE async function for main workflow
// (async () => {
//   const workflow = new StartupNewsWorkflow(
//     "https://yourstory.com/2024/06/capital-is-no-substitute-for-revenue-says-tv-mohandas-pai-byju-edtech"
//   );
//   await workflow
//     .triggerWorkflow()
//     // .then(() => workflow.rewriteArticle())
//     // .then(() => workflow.generateTweet())
//     // .then(() => workflow.postTweet())
//     // .then(() => workflow.writeToSpreadsheet("output.xlsx"))
//     .catch((error) => console.error("Workflow failed:", error));
// })();
